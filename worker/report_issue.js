const prisma = require("../db").getInstance();
module.exports = async function (msg, server_id) {
    await prisma.issueReport.create({
        data: {
            senderId: parseInt(server_id),
            message: msg,
            action: "Need to be added",
            timestamp: parseInt(Date.now() / 1000)
        }
    })
}