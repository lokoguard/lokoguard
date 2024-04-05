const router = require("express").Router();
const prisma = require("../../db").getInstance();

// Policy list
router.get("/", async (req, res) => {
    const policy = await prisma.policy.findFirst({
        where: {
            senderId: parseInt(id)
        },
        select: {
            id: true,
            name: true
        }
    });
    res.json(policy);
})

// Fetch policy
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const policy = await prisma.policy.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            id: true,
            name: true,
            generatedCode: true,
            workspace: true
        }
    });
    if(!policy) return res.status(404).json({
        error: "Not Found"
    });
    res.json(policy);
})

// Delete policy
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const policy = await prisma.policy.findFirst({
        where: {
            id: parseInt(id)
        }
    });
    if(!policy) return res.status(404).json({
        error: "Not Found"
    });
    await prisma.policy.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json({
        message: "OK"
    })
})

// Create policy
router.post("/", async (req, res) => {
    const { name } = req.body;
    await prisma.policy.create({
        data: {
            name
        }
    });
    res.json({
        message: "OK"
    })
})

// Update policy
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { generatedCode, workspace } = req.body;
    const policy = await prisma.policy.findFirst({
        where: {
            id: parseInt(id)
        }
    });
    if(!policy) return res.status(404).json({
        error: "Not Found"
    });
    await prisma.policy.update({
        where: {
            id: parseInt(id)
        },
        data: {
            generatedCode,
            workspace
        }
    });
    res.json({
        message: "OK"
    })
})

module.exports = router;