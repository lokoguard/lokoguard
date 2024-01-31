const router = require("express").Router();
const prisma = require("../../db").getInstance();
const { SenderType } = require("@prisma/client");
const { generateApiKey } = require("generate-api-key");

// Get all senders
router.get("/", async (req, res) => {
    const senders = await prisma.sender.findMany();
    res.json(senders);
})

// Get sender by id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const sender = await prisma.sender.findFirst({
        where: {
            id: parseInt(id)
        }
    });
    if(!sender) return res.status(404).json({
        error: "Not Found"
    });
    res.json(sender);
})

// Add new sender
router.post("/", async (req, res) => {
    const { applicationName, hostname, mac, ip, type } = req.body;
    if (type === null || type === undefined) return res.status(400).json({
        error: "Missing required fields"
    });
    if(type === "DEVICE") {
        if(!ip || !mac || !hostname) return res.status(400).json({
            error: "Missing required fields"
        });
    }
    if(type === "APP") {
        if(!applicationName) return res.status(400).json({
            error: "Missing required fields"
        });
    }

    let sender_type = SenderType.DEVICE;
    if(type === "APP") sender_type = SenderType.APP;
    
    const sender = await prisma.sender.create({
        data: {
            applicationName,
            hostname,
            mac,
            type: sender_type,
            ip
        }
    });
    res.json(sender);
})

// Update sender details
router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    // check if exists
    const sender_check = await prisma.sender.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            type: true
        }
    });

    if(!sender_check) return res.status(404).json({
        error: "Not Found"
    });

    const { applicationName, hostname, mac, ip, type } = req.body;
    // return error if type is not defined
    if (type !== sender_check.type.toString()) {
        return res.status(400).json({
            error: "Cannot change sender type"
        });
    }
    if (type === null || type === undefined) return res.status(400).json({
        error: "Missing required fields"
    });
    if(type === "DEVICE") {
        if(!ip || !mac || !hostname) return res.status(400).json({
            error: "Missing required fields"
        });
    }
    if(type === "APP") {
        if(!applicationName) return res.status(400).json({
            error: "Missing required fields"
        });
    }

    let sender_type = SenderType.DEVICE;
    if(type === "APP") sender_type = SenderType.APP;

    const sender = await prisma.sender.update({
        where: {
            id: parseInt(id)
        },
        data: {
            applicationName,
            hostname,
            mac,
            type: sender_type,
            ip
        }
    });
    res.json(sender);
})

// Generate auth token
router.post("/:id/auth", async (req, res) => {
    const { id } = req.params;
    const sender = await prisma.sender.findFirst({
        where: {
            id: parseInt(id)
        }
    });
    if(!sender) return res.status(404).json({
        error: "Not Found"
    });
    const token = await prisma.authToken.create({
        data: {
            sender: {
                connect: {
                    id: sender.id
                }
            },
            token: generateApiKey()
        }
    });
    res.json({
        token: token.token
    });
})


module.exports = router;