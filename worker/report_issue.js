const prisma = require("../db").getInstance();
module.exports = async function (issue, action, server_id) {
    await prisma.issueReport.create({
        data: {
            senderId: parseInt(server_id),
            message: issue,
            action: action,
            timestamp: parseInt(Date.now() / 1000)
        }
    })
}