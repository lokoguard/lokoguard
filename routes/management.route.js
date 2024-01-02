const router = require("express").Router();
const middleware = require("../middleware");

router.use("/auth", require("./management/auth.route"))
router.use("/senders", middleware.managementAuth, require("./management/sender.route"))

module.exports = router;