require('dotenv').config();
const prisma = require("../db").getInstance();
const vm = require('vm');
const helperFunctions = require("./helperFunctions");
const Queue = require('bee-queue');

const hooks = ["on_new_log", "on_file_event", "on_disk_usage_update", "on_memory_usage_update", "on_cpu_usage_update"]
const hooksConcurrency = {
    on_new_log: 20,
    on_file_event: 5,
    on_disk_usage_update: 1,
    on_memory_usage_update: 1,
    on_cpu_usage_update: 1
}
const hooksQueue = new Map(hooks.map(hook => [hook, new Queue(hook)]));

async function prepareFunctionContext() {
    // Prepare function context
    const whitelistFunctions = Object.keys(helperFunctions);
    // Prepare hook functions context
    let hookFunctionsRef = {}
    for (const hook of hooks) {
        hookFunctionsRef[hook] = []
    }
    let hookFunctionsName = Object.keys(hookFunctionsRef);
    // Fetch all policies
    const policies = await prisma.policy.findMany({
        select: {
            generatedCode: true
        }
    });
    const generatedCodes = policies.map(policy => policy.generatedCode);
    // Run each code and extract functions
    for (const generatedCode of generatedCodes) {
        const context = vm.createContext(helperFunctions);
        vm.runInContext(generatedCode, context);
        for (const prop in context) {
            if (typeof context[prop] === 'function' && !whitelistFunctions.includes(prop.toString()) && hookFunctionsName.includes(prop.toString())) {
                hookFunctionsRef[prop].push(context[prop]);
            }
        }
    }
    // return
    return hookFunctionsRef
}

async function runHooksJob() {
    // Create function context
    const hookFunctionsRef = await prepareFunctionContext();
    for (const [hook, queue] of hooksQueue) {
        console.log("Running hook: " + hook + " with concurrency: " + hooksConcurrency[hook]);
        queue.process(hooksConcurrency[hook], async (job) => {
            let hookFunction = job.data.function;
            let args = job.data.args;
            // check if function exists
            if (hooks.includes(hookFunction)) {
                try {
                    const promises = Promise.all(hookFunctionsRef[hookFunction].map(fn => fn(...args)));
                    await promises;
                } catch (error) {
                    console.log("Error in hook function: " + hookFunction);
                    console.log(error.message);
                }
            } else {
                console.log("Function not found: " + hookFunction);
            }
            return null
        })
    }
}

module.exports = {
    prepareFunctionContext,
    runHooksJob,
    hooks,
    hooksQueue
}