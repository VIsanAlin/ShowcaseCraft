const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const jsonServer = require("json-server");

const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Destination folder
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Handle file upload
app.post("/upload", upload.single("logo"), (req, res) => {
  res.send("File uploaded successfully!");
});

// Create a JSON Server instance
const jsonServerMiddleware = jsonServer.router("db.json", {
  foreignKeySuffix: "_id",
});

// Use JSON Server as middleware for the '/api' route
app.use("/api", (req, res, next) => {
  // Delay API responses to simulate real-world scenarios (optional)
  setTimeout(() => jsonServerMiddleware(req, res, next), 1000);
});

// Use JSON Server defaults
app.use(jsonServer.defaults());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
