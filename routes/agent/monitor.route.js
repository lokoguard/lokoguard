const router = require("express").Router();
const prisma = require("../../db").getInstance();
 

router.get("/file-integrity/files", async (req, res) => {
    try {
        const integrity_reports = await prisma.watchingFile.findMany({
            where: {
                senderId: req.sender.id,
            },
            select: {
                FileName: true,
            }
        })
        const file_names = integrity_reports.map(report => report.FileName);
        return res.status(200).json(file_names);
    } catch (error) {
        return res.status(500).json({ error: "Unexpected Error" });
    }
});

router.post("/file-integrity/result", async (req, res) => {
    try { 
        const integrity_reports = req.body;
        await prisma.$transaction(integrity_reports.map(report => {
            return prisma.fileIntegrityMonitor.create({
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