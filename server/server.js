require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Recipe = require("./models/Recipe");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Recipe Box API is running"
  });
});

app.get("/api/recipes", async (req, res) => {
  try {
    const { search, sort, order } = req.query;

    const filter = {};

    // Search by name or cuisine
    if (search) {
      filter.$or = [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          cuisine: {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    let query = Recipe.find(filter);

    // Sort recipes
    const sortFields = {
      name: "name",
      prep_time: "prep_time",
      difficulty: "difficulty",
      date_added: "date_added"
    };

    if (sortFields[sort]) {
      query = query.sort({
        [sortFields[sort]]: order === "desc" ? -1 : 1
      });
    }

    const results = await query;

    res.json(results);
  } catch (error) {
    console.error("Error fetching recipes:", error);

    res.status(500).json({
      error: "Failed to fetch recipes."
    });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Recipe Box API running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });