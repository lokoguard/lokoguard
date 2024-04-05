const router = require("express").Router();
const prisma = require("../../db").getInstance();
const bcrypt = require('bcrypt');
const { generateApiKey } = require("generate-api-key");
const middleware = require("../middleware");


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({
        error: "Missing required fields"
    });
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    });
    if (user) {
        // match hash using bcrypt
        const match = await bcrypt.compare(password, user.passwordHash);
        if (match) {
            // generate token
            const token = await prisma.userAPIKey.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    apiKey: generateApiKey()
                }
            });
            res.json({
                token: token.apiKey
            });
        } else {
            res.status(401).json({
                error: "Invalid credentials"
            });
        }
    } else {
        res.status(401).json({
            error: "Invalid credentials"
        });
    }
})


// Logout
router.post("/logout", async (req, res) => {
    const bearer_token = req.headers.authorization;
    if (!bearer_token) return res.status(401).json({
        error: "Unauthorized"
    });
    const token = bearer_token.split(" ")[1];
    await prisma.userAPIKey.delete({
        where: {
            apiKey: token
        }
    });
    res.json({
        message: "Logged out"
    });
})

// Verify
router.get("/verify", middleware.managementAuth, async (req, res) => {
    return res.json({
        message: "Logged in"
    });
})

module.exports = router;