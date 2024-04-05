const router = require("express").Router();
const middleware = require("./middleware");

router.use("/auth", require("./management/auth.route"))
router.use("/users", middleware.managementAuth, require("./management/user.route"))
router.use("/senders", middleware.managementAuth, require("./management/sender.route"))
router.use("/policies", middleware.managementAuth, require("./management/policy.route"))

module.exports = router;