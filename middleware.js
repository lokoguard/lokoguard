
const prisma = require("./db").getInstance();

class Middleware {
    /**
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    static async managementAuth(req, res, next) {
        try {
            const bearer_token = req.headers.authorization;
            if (bearer_token === null || bearer_token === undefined) throw new Error("Unauthorized");
            const token = bearer_token.split(" ")[1];
            const user = await prisma.userAPIKey.findFirstOrThrow({
                where: {
                    apiKey: token
                },
                select: {
                    user: {
                        select: {
                            email: true,
                            id: true,
                            name: true
                        }
                    }
                }
            })
            req.user = user.user;
            req.is_user = true;
            next();
        } catch (err) {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    }


    /**
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    static async deviceAuth(req, res, next) {
        try {
            const bearer_token = req.headers.authorization;
            if (bearer_token === null || bearer_token === undefined) throw new Error("Unauthorized");
            const token = bearer_token.split(" ")[1];
            const device = await prisma.authToken.findFirstOrThrow({
                where: {
                    token: token
                },
                select: {
                    sender: {
                        select: {
                            id: true,
                            applicationName: true,
                            hostname: true,
                            mac: true,
                            type: true,
                            ip: true,
                        }
                    }
                }
            })
            req.sender = device.sender;
            req.is_device = true;
            next();
        } catch (err) {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    }

    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    static async onlyApplication(req, res, next) {
        try {
            if (req.sender && req.sender.type === "APP") {
                next();
            } else {
                throw new Error("Only allowed for application");
            }
        } catch (err) {
            res.status(403).json({
                message: "Only allowed for application"
            });
        }
    }
}

module.exports = Middleware;