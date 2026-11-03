// Temp in-memory storage
// Data disappears when server restarts

// Array to hold symptom reports.
const reports = [];

// Counter used to assign report IDs.
let currentId = 1;

// generate next report id
function nextId() {
    return currentId++;
}

// save new symptom report
function save(report) {
    reports.push(report);
}

function getAll() {
    return reports;
}

module.exports = {
    nextId,
    save,
    getAll
};