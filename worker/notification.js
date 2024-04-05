const { default: axios } = require("axios")

module.exports = async function (message) {
    await axios.post(process.env.NTFY_URL, message)
}