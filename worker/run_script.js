const prisma = require("../db").getInstance();

module.exports = async function (bash_script, args, timeout_seconds, server_id) {
    const record = await prisma.scriptRunnerRequest.create({
        data: {
            script: bash_script,
            args: args,
            status: "pending",
            senderId: parseInt(server_id)
        }
    })
    // wait for max 1 minute for the script to finish
    const start = Date.now();
    let result = null;
    while (Date.now() - start < parseInt(timeout_seconds)) {
        result = await prisma.scriptRunnerRequest.findFirst({
            where: {
                id: record.id,
            },
            select: {
                status: true,
                result: {
                    select: {
                        output: true,
                        success: true
                    }
                }
            }
        })
        if (result.status === "done"){
            break
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    if (result.result && result.result.output){
        return result.result.output
    } else {
        return ""
    }
}