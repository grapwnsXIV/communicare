const symptomStore = require("../data/symptomStore");
const validSeverities = ["mild", "moderate", "severe"];

function createReport(data) {
    if (!data || typeof data !== "object" || Array.isArray(data)) {
        throw new Error("A symptom report is required");
    }

    const { bodyPart, symptomType, severity } = data;

    if (
        typeof bodyPart !== "string" ||
        typeof symptomType !== "string" ||
        typeof severity !== "string" ||
        !bodyPart.trim() || !symptomType.trim()
    ) {
        throw new Error("Valid symptom details are required");
    }

    const normalizedSeverity = severity.toLowerCase();

    if (!validSeverities.includes(normalizedSeverity)) {
        throw new Error("Invalid severity level");
    }

    const report = {
        id: symptomStore.nextId(),
        bodyPart: bodyPart.trim(),
        symptomType: symptomType.trim(),
        severity: normalizedSeverity,
        createdAt: new Date().toISOString()
    };

    symptomStore.save(report);

    return report;
}

function getReports() {
    return symptomStore.getAll();
}

module.exports = {
    createReport,
    getReports
};