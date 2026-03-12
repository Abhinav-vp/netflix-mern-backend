const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware — MUST come before routes
app.use(cors());
app.use(express.json());

// Routes
const authRoute = require("./routes/auth");
const watchlistRoute = require("./routes/watchlist");

app.use("/api/auth", authRoute);
app.use("/api/watchlist", watchlistRoute);

// Serve frontend in production
app.use(express.static(path.join(__dirname, "frontend",)));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
