require('dotenv').config();
const { hooksQueue } = require("./core");


function enqueueOnNewLog(logId, logContent, facilityLevel, severityLevel, serverId, serverHostname) {
    hooksQueue.get("on_new_log").createJob({
        function: "on_new_log",
        args: [logId, logContent, facilityLevel, severityLevel, serverId, serverHostname]
    }).save();
}

function enqueueOnFileEvent(event, fileName, serverId, serverHostname) {
    hooksQueue.get("on_file_event").createJob({
        function: "on_file_event",
        args: [event, fileName, serverId, serverHostname]
    }).save();
}

function enqueueOnDiskUsageUpdate(usagePercent, disk, totalDiskGb, freeDiskGb, usedDiskGb, serverId, serverHostname) {
    hooksQueue.get("on_disk_usage_update").createJob({
        function: "on_disk_usage_update",
        args: [usagePercent, disk, totalDiskGb, freeDiskGb, usedDiskGb, serverId, serverHostname]
    }).save();
}

function enqueueOnMemoryUsageUpdate(memoryUsagePercent, totalMemoryGb, freeMemoryGb, usedMemoryGb, serverId, serverHostname) {
    hooksQueue.get("on_memory_usage_update").createJob({
        function: "on_memory_usage_update",
        args: [memoryUsagePercent, totalMemoryGb, freeMemoryGb, usedMemoryGb, serverId, serverHostname]
    }).save();
}

function enqueueOnCpuUsageUpdate(avgCpuUsagePercent, serverId, serverHostname) {
    hooksQueue.get("on_cpu_usage_update").createJob({
        function: "on_cpu_usage_update",
        args: [avgCpuUsagePercent, serverId, serverHostname]
    }).save();
}

module.exports = {
    enqueueOnNewLog,
    enqueueOnFileEvent,
    enqueueOnDiskUsageUpdate,
    enqueueOnMemoryUsageUpdate,
    enqueueOnCpuUsageUpdate
}