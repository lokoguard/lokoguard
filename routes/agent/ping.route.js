const router = require("express").Router();
const prisma = require("../../db").getInstance();

// Ping
router.get("/", async (req, res) => {
    await prisma.sender.update({
        where: {
            id: req.sender.id
        },
        data: {
            lastSeen: new Date()
        }
    })
    return res.status(200).json({ message: "OK" });
})

module.exports = router;