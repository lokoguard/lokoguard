require('dotenv').config();
const { getPolicyGlobalVersion } = require('./policyGlobalVersion');
const { runHooksJob } = require("./worker/core");


async function main() {
    let policyVersion = await getPolicyGlobalVersion();
    await runHooksJob();
    while (true) {
        if (policyVersion == await getPolicyGlobalVersion()) {
            await new Promise(resolve => setTimeout(resolve, 1000))
        } else {
            console.log("Policy version changed, stopping worker");
            process.exit(0)
        }
    }
    
}


main()
    .catch(e => console.error(e))