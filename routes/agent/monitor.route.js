const router = require("express").Router();
const prisma = require("../../db").getInstance();
 

router.post("/file-integrity", async (req, res) => {
    try { 
        const integrity_reports = req.body;
        await prisma.$transaction(integrity_reports.map(report => {
            return prisma.fileIntegrity.create({
                data: {
                    senderId: req.sender.id,
                    FileName: report.file_name,
                    EventType: report.type,
                    Timestamp: report.timestamp,
                }
            })
        }))
        return res.status(200).json({ message: "OK" });
    
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
});

router.post("/resource-usage", async (req, res) => {
    try {
        const usage_reports = req.body;
        await prisma.$transaction(usage_reports.map(report => {
            return prisma.resourceStats.create({
                data: {
                    senderId: req.sender.id,
                    CPUStats: report.cpu_stats,
                    MemStat: report.mem_stat,
                    DiskStats: report.disk_stats,
                    TemperatureStats: report.temp_stats,
                    NetStat: report.net_stat,
                    HostInfo: report.host_info,
                    Timestamp: report.timestamp,
                }
            })
        }))
        return res.status(200).json({ message: "OK" });
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }

});


module.exports = router;