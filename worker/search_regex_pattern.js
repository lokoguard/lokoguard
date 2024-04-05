module.exports = function(regexp_pattern, message) {
    const regex = new RegExp(regexp_pattern)
    return regex.test(message)
}