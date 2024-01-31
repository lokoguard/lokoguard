const router = require("express").Router();
const prisma = require("../../db").getInstance();

router.get("", async (req, res) => {
    try {
        const executors = await prisma.scriptRunnerRequest.findMany({
            where: {
                senderId: req.sender.id,
                status: "pending"
            }
        })
        return res.status(200).json(executors);
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
})

router.post("/submit", async (req, res) => {
    try {
        const { id, output, error, success, exit_code } = req.body;
        await prisma.$transaction([
            prisma.scriptRunnerResult.create({
                data: {
                    output: output,
                    error: error,
                    success: success,
                    exitCode: exit_code,
                    scriptRunnerRequestId: id
                }
            }),
            prisma.scriptRunnerRequest.update({
                where: {
                    id: id
                },
                data: {
                    status: "done"
                }
            })
        ])
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
})

module.exports = router;