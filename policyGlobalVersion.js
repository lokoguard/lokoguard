require('dotenv').config();
const prisma = require("./db").getInstance();

async function getPolicyGlobalVersion() {
    let record =  await prisma.systemSetting.findFirst();
    if(record){
        return record.policyCodeGlobalVersion;
    }
    return 0;
}

async function updatePolicyGlobalVersion() {
    let record =  await prisma.systemSetting.findFirst();
    if(record){
        await prisma.systemSetting.update({
            where: {
                id: record.id
            },
            data: {
                policyCodeGlobalVersion: record.policyCodeGlobalVersion + 1
            }
        })
    } else {
        await prisma.systemSetting.create({
            data: {
                policyCodeGlobalVersion: 1
            }
        })
    }
}

module.exports = {
    getPolicyGlobalVersion,
    updatePolicyGlobalVersion
}