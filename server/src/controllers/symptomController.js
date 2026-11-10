const symptomService = require("../services/symptomService");

// Handle new symptom report
async function createReport(req, res) {
    try {
        const report = await symptomService.createReport(req.body);

        res.status(201).json({
            message: 'Symptom report created',
            report
        });
    } catch (error) {
        if (error.status === 400) {
            return res.status(400).json({
                error: error.message
            });
        }
        console.error('Error creating report:', error);

        return res.status(500).json({
            error: 'Unable to create symptom report'
        });
    }
}

// Retrieve stored demo reports
async function getReports(req, res) {
    try {
        const reports = await symptomService.getReports();
        res.json(reports);
    } catch (error) {
        console.error('Error retrieveing reports:', error);
        return res.status(500).json({
            error: 'Unable to retrieve symptom reports'
        });
    }
}

module.exports = {
    createReport,
    getReports
};