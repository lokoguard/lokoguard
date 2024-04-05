const router = require("express").Router();
const middleware = require("../middleware");

// Send info
router.get("/", middleware.deviceAuth, async (req, res) => {
    return res.json(req.sender);
})

module.exports = router;