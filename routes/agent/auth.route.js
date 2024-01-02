const router = require("express").Router();
const middleware = require("../../middleware");

// Verify
router.get("/verify", middleware.deviceAuth, async (req, res) => {
    return res.json({
        message: "Logged in"
    });
})

module.exports = router;