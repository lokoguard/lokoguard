
const prisma = require("./db").getInstance();

class Middleware {
    /**
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */
    static async auth(req, res, next) {
        try {
            const bearer_token = req.headers.authorization;
            if(bearer_token === null || bearer_token === undefined) throw new Error("Unauthorized");
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
            next();
        } catch (err) {
            res.status(401).json({
                message: "Unauthorized"
            });
        }
    }
}

module.exports = Middleware;