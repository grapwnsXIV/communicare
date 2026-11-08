const express = require("express");
const cors = require("cors");
require("dotenv").config();

const symptomRoutes = require("./routes/symptomRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

// Allow React frontend to communicate with Express
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ]
}));

// Parse JSON request bodies
app.use(express.json({ limit: "10kb" }));

// Route to check the server is running.
app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        message: "Communicare backend is running"
    });
});

// Register symtom API endpoints.
app.use("/api/symptoms", symptomRoutes);

// Unknown API routes.
app.use((req, res) =>  {
    res.status(404).json({ error: "Route not found"});
});


// Start backend server
app.listen(PORT, () => {
    console.log(`Communicare server is running on port ${PORT}`);
});