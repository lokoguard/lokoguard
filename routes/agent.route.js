const router = require("express").Router();
const middleware = require("../middleware");


router.use("/auth", require("./agent/auth.route"))
router.use("/info", middleware.deviceAuth, require("./agent/info.route"))
router.use("/monitor", middleware.deviceAuth, require("./agent/monitor.route"))
router.use("/executor", middleware.deviceAuth, require("./agent/executor.route"))
router.use("/log", middleware.deviceAuth, require("./agent/log.route"))
module.exports = router;