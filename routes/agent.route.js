const router = require("express").Router();
const middleware = require("../middleware");


router.use("/auth", require("./agent/auth.route"))
router.use("/info", middleware.deviceAuth, require("./agent/info.route"))
module.exports = router;