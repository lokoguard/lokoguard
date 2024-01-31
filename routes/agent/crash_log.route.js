const router = require("express").Router();
const prisma = require("../../db").getInstance();

router.post("", async (req, res) => {
    try {
        const body = req.body;
        await prisma.crashLog.create({
            data: {
                message: body.message,
                stackTrace: body.stack_trace,
                otherInfo: body.other_info,
                timestamp: parseInt(Date.now()/1000),
                senderId: req.sender.id
            }
        })
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
})

module.exports = router;