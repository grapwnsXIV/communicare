const symptomService = require("../services/symptomService");

// Handle new symptom report
function createReport(req, res) {
    try {
        const report = symptomService.createReport(req.body);

        res.status(201).json({
            message: "Symptom report created",
            report
        });
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
}

// Retrieve stored demo reports
function getReports(req, res) {
    const reports = symptomService.getReports();
    res.json(reports);
}

module.exports = {
    createReport,
    getReports
};