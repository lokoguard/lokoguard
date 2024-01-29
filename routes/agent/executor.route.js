const router = require("express").Router();
const prisma = require("../../db").getInstance();

router.get("/fetch", async (req, res) => {
    try {
        const executors = await prisma.scriptRunnerRequest.findMany({
            where: {
                senderId: req.sender.id,
                Status: "pending"
            }
        })
        return res.status(200).json({ executors });
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
})

router.post("/result", async (req, res) => {
    try {
        const { task_id, output, error, success, exit_code } = req.body;
        await prisma.$transaction([
            prisma.scriptRunnerResult.create({
                data: {
                    scriptRunnerRequestId: task_id,
                    TaskId: task_id,
                    Output: output,
                    Error: error,
                    Success: success,
                    ExitCode: exit_code
                }
            }),
            prisma.scriptRunnerRequest.update({
                where: {
                    id: task_id
                },
                data: {
                    Status: "done"
                }
            })
        ])
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
})

module.exports = router;