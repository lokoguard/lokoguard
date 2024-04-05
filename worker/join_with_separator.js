module.exports = function (seperator, message) {
    if (!Array.isArray(message)) return message
    return message.join(seperator)
}