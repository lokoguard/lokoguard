require('dotenv').config();
const { prepareFunctionContext, runHooksJob } = require("./worker/core");


async function main() {
    await runHooksJob();
}


main()
    .catch(e => console.error(e))