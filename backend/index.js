const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const { GridFsStorage } = require("multer-gridfs-storage");
const multer = require("multer");

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
      type: String,
      ref: "AudioFile",
      required: true,
    },
    created_at: { type: Date, default: Date.now },
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
    const fileId = req.params.id;
    const files = await gfs.find({ uuid: fileId }).toArray();

    if (files.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    const file = files[0];

    // Streaming audio file using GridFSBucket
    const readStream = gfsBucket.openDownloadStream(file._id);
    res.set("Content-Type", "audio/mpeg");
    readStream.pipe(res);

    readStream.on("error", (err) => {
      res.status(404).json({ error: "File not found" });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/webhook", async (req, res) => {
  try {
    const { event, data } = req.body;

    if (event === "TTS_TEXT_SUCCESS") {
      const { media_url, tts_input, speaker_name, uuid } = data;

      console.log(`Processing audio file for: ${tts_input}`);

      // Download the audio file
      const response = await axios({
        method: "GET",
        url: media_url,
        responseType: "stream",
      });

      // Store the audio file in MongoDB using GridFS
      const uploadStream = gfs.openUploadStream(`${uuid}.mp3`, {
        metadata: {
          uuid: uuid,
        },
      });

      response.data.pipe(uploadStream);

      uploadStream.on("finish", () => {
        console.log("Audio file stored successfully!");
        res.status(200).json({ message: "Audio file processed and stored!" });
      });

      uploadStream.on("error", (err) => {
        console.error("Error storing audio file:", err);
        res.status(500).json({ error: "Failed to store audio file" });
      });
    } else {
      res.status(400).json({ message: "Unsupported event type" });
    }
  } catch (err) {
    console.error("Error processing webhook:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/webhook", async (req, res) => {
  res.send("<h1>All hail the WEBHOOK</h1>");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
