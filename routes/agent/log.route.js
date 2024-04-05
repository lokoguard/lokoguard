const { enqueueOnNewLog } = require("../../worker/enqueue");

const router = require("express").Router();
const prisma = require("../../db").getInstance();

router.post("", async (req, res) => {
    try {
        const body = req.body;
        const logRecord = await prisma.logMessage.create({
            data: {
                version: body.version,
                appname: body.appname,
                facilityLevel: body.facility_level,
                facilityMessage: body.facility_message,
                hostname: body.hostname,
                message: body.message,
                severityLevel: body.severity_level,
                severityMessage: body.severity_message,
                timestamp: body.timestamp,
                senderId: req.sender.id
            }
        })
        await enqueueOnNewLog(logRecord.id, logRecord.message, logRecord.facilityLevel, logRecord.severityLevel, req.sender.id, req.sender.hostname)
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
})

module.exports = router;