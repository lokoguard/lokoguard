const db = require("./db").getInstance();
const bcrypt = require('bcrypt');

async function main() {
    // check if no user exists
    const users = await db.user.findMany();
    if (users.length === 0) {
        // create admin user
        let passwordHash = await bcrypt.hash("admin", 10);
        const user = await db.user.create({
            data: {
                email: "admin@localhost",
                passwordHash: passwordHash,
                name: "Admin"
            }
        }
        )
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await db.$disconnect();
    })