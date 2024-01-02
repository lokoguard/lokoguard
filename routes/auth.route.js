const router = require("express").Router();
const prisma = require("../db").getInstance();
const { generateApiKey } = require('generate-api-key');


module.exports = router;