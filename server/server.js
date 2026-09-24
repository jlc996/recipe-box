const express = require("express");
const cors = require("cors");

const { recipes } = require("./data");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Recipe Box API is running"
  });
});

app.get("/api/recipes", (req, res) => {
  res.json(recipes);
});

app.listen(PORT, () => {
  console.log(`Recipe Box API running on http://localhost:${PORT}`);
});