module.exports = function (group_name, regexp_pattern, message) {
    const regex = new RegExp(regexp_pattern);
    const match = regex.exec(message);
    if (match && match.groups && match.groups[group_name] !== undefined) {
        return match.groups[group_name];
    } else {
        return "";
    }
}