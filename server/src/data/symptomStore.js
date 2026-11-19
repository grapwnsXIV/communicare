// Temp in-memory storage
// Data disappears when server restarts

// Array to hold symptom reports.
// const reports = [];

// // Counter used to assign report IDs.
// let currentId = 1;

// // generate next report id
// function nextId() {
//     return currentId++;
// }

// // save new symptom report
// function save(report) {
//     reports.push(report);
// }

// function getAll() {
//     return reports;
// }

// module.exports = {
//     nextId,
//     save,
//     getAll
// };

// Updated code with DB in mind
const pool = require('../config/database');

// Save symptom report to MariaDB.
async function save(report) {
    const result = await pool.query(
        `INSERT INTO symptom_reports
            (body_part, symptom_type, severity)
         VALUES (?, ?, ?)`,
        [
            report.bodyPart,
            report.symptomType,
            report.severity
        ]
    );

    // Retrieve the newly saved report from MariaDB.
    const rows = await pool.query(
        `SELECT
            id,
            body_part AS bodyPart,
            symptom_type AS symptomType,
            severity,
            status,
            created_at AS createdAt
         FROM symptom_reports
         WHERE id = ?`,
        [Number(result.insertId)]
    );

    return rows[0];
}

// Retrieve symptom reports.
async function getAll() {
    const rows = await pool.query(
        `SELECT
            id,
            body_part AS bodyPart,
            symptom_type AS symptomType,
            severity,
            status,
            created_at AS createdAt
         FROM symptom_reports
         ORDER BY id DESC`
    );

    return rows;
}

// Retrieve one symptom report by ID.
async function getById(id) {
    const rows = await pool.query(
        `SELECT
            id,
            body_part AS bodyPart,
            symptom_type AS symptomType,
            severity,
            status,
            created_at AS createdAt
            FROM symptom_reports
            WHERE id = ?`, // filters the results to requested report ID
            [id]
    );

    return rows[0] || null; // return the matching report if exists. Return null if no report matches that ID.
}

// Update status of existing symptom report. Returns the updated report or null if not found.
async function updateStatus(id, status) {
    const result = await pool.query(
        `UPDATE symptom_reports
        SET status = ?
        WHERE id = ?`,
        [status, id]
    );

    if (Number(result.affectedRows) === 0) {
        return null;
    }
    return await getById(id);
}

module.exports = { save, getAll, getById, updateStatus };
