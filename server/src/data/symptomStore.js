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

/**
 * Retrieve symptom reports using filters
 * supported filters:
 * status, severity, bodypart
 *  
 */
async function getFilteredReports(filters = {}, options = {}) {
    let sql = `
        SELECT
            id,
            body_part AS bodyPart,
            symptom_type AS symptomType,
            severity,
            status,
            created_at AS createdAt
        FROM symptom_reports
        WHERE 1 = 1
    `;

    const params = [];

    if (filters.status) {
        sql += ` AND status = ?`;
        params.push(filters.status);
    }

    if (filters.severity) {
        sql += ` AND severity = ?`;
        params.push(filters.severity);
    }

    if (filters.bodyPart) {
        sql += ` AND body_part = ?`;
        params.push(filters.bodyPart);
    }

    // pagination settings

    // This preserves existing filters while adding pagination.
    const page = options.page === undefined ? 1 : Number(options.page);
    const limit = options.limit === undefined ? 10 : Number(options.limit);

    if (
        !Number.isSafeInteger(page) ||
        page < 1 ||
        !Number.isSafeInteger(limit) ||
        limit < 1 ||
        limit > 100
    ) {
        throw new RangeError('Invalid pagination settings');
    }

    const offset = (page - 1) * limit;

    if (!Number.isSafeInteger(offset)) {
        throw new RangeError('Pagination offset is too large');
    }

    sql += ` ORDER BY id DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    return await pool.query(sql, params);
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

module.exports = { save, getAll, getById, updateStatus, getFilteredReports };
