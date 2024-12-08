const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Configuration
const mongoURI = process.env.MONGODB_URL;
console.log(mongoURI);
const dbName = "hackernews";
let gfs;

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");

    const conn = mongoose.connection;
    gfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "fs", // Default bucket name
    });
    console.log("GridFSBucket initialized");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Schema for Posts
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    content: { type: String, required: true },
    audio_file_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AudioFile",
      required: true,
    },
    created_at: {
      type: Number, // Use Number to store Unix timestamps
      default: () => Math.floor(Date.now() / 1000), // Default to current Unix timestamp in seconds
    },
  },
  { collection: "posts" }
);

const Post = mongoose.model("Post", postSchema);

// API to Fetch All Posts
app.get("/posts", (req, res) => {
  Post.find({})
    .sort({ created_at: -1 })
    .then((posts) => {
      res.json(posts);
    });
});

// API to Fetch Audio File by ID
app.get("/audio/:id", async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    // Streaming audio file using GridFSBucket
    const readStream = gfsBucket.openDownloadStream(fileId);
    res.set("Content-Type", "audio/mpeg");
    readStream.pipe(res);

    readStream.on("error", (err) => {
      res.status(404).json({ error: "File not found" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
