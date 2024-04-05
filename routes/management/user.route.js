const router = require("express").Router();
const prisma = require("../../db").getInstance();

// Get all users
router.get("/", async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true
        }
    });
    res.json(users);
})

// Create user
router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({
        error: "Missing required fields"
    });
    let passwordHash = await bcrypt.hash(password, 10);
    await db.user.create({
        data: {
            email: email,
            passwordHash: passwordHash,
            name: name
        }
    })
    res.json({
        message: "User created"
    })
})

// Delete user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    if (id == req.user.id) {
        return res.status(400).json({
            error: "Cannot delete yourself"
        });
    }
    const user = await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });
    res.json(user);
})

module.exports = router