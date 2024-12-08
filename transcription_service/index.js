const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/", (req, res) => {
  const requestData = req.body;
  console.log("Received POST request:", requestData);

  // Send a response back
  res.status(200).json({ message: "Data received successfully!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
