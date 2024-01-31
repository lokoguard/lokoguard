const router = require("express").Router();
const prisma = require("../../db").getInstance();
 
// Fetch all the files that are going to be watched by the agent
router.get("/file", async (req, res) => {
    try {
        const requestedWatchers = await prisma.fileWatcher.findMany({
            where: {
                senderId: req.sender.id,
            },
            select: {
                FileName: true,
            }
        })
        const file_names = requestedWatchers.map(report => report.FileName);
        return res.status(200).json(file_names);
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
});

// Submit the results of accessing the files by the agent
router.post("/file", async (req, res) => {
    try { 
        const access_reports = req.body;
        await prisma.$transaction(access_reports.map(report => {
            return prisma.fileAccessEvent.create({
                data: {
                    senderId: req.sender.id,
                    fileName: report.file_name,
                    eventType: report.type,
                    timestamp: report.timestamp,
                }
            })
        }))
        return res.status(200).json({ message: "OK" });
    
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
});

// submit the resource details of the host by the agent
router.post("/resource", async (req, res) => {
    try {
        const usage_reports = req.body;
        await prisma.$transaction(usage_reports.map(report => {
            return prisma.resourceStats.create({
                data: {
                    senderId: req.sender.id,
                    cpuStats: report.cpu_stats,
                    memStat: report.mem_stat,
                    diskStats: report.disk_stats,
                    temperatureStats: report.temp_stats,
                    netStat: report.net_stat,
                    hostInfo: report.host_info,
                    timestamp: report.timestamp,
                }
            })
        }))
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }

});


module.exports = router;