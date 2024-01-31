const router = require("express").Router();
const middleware = require("../../middleware");

// Verify
router.get("/verify", middleware.deviceAuth, async (req, res) => {
    return res.status(200).json({ message: "OK" });
})

module.exports = router;