const symptomStore = require("../data/symptomStore");
const validSeverities = ["mild", "moderate", "severe"];


async function createReport(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
        const error = new Error('A symptom report is required');
        error.status = 400;
        throw error;
    }

    const { bodyPart, symptomType, severity } = data;

    if (
        typeof bodyPart !== 'string' ||
        typeof symptomType !== 'string' ||
        typeof severity !== 'string' ||
        !bodyPart.trim() || !symptomType.trim()
    ) {
        const error = new Error('Valid symptom details are required');
        error.status = 400;
        throw error;
    }

    const normalizedSeverity = severity.toLowerCase();

    if (!validSeverities.includes(normalizedSeverity)) {
        const error = new Error('Invalid severity level');
        error.status = 400;
        throw error;
    }

    return await symptomStore.save({
        bodyPart: bodyPart.trim(),
        symptomType: symptomType.trim(),
        severity: normalizedSeverity
    });
}

async function getReports() {
    return await symptomStore.getAll();
}

module.exports = {
    createReport,
    getReports
};