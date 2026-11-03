const express = require("express");
const router = express.Router();

const symptomController = require("../controllers/symptomController");

// Submit new symptom report.
router.post("/", symptomController.createReport);

// Retrieve all symptom reports.
router.get("/", symptomController.getReports);


module.exports = router;