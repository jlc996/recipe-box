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
  const { search, sort, order } = req.query;

  let results = [...recipes];

  // Search by name or cuisine
  if (search) {
    const searchTerm = search.toLowerCase();

    results = results.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.cuisine.toLowerCase().includes(searchTerm)
      );
    });
  }

  // Sort recipes
  if (sort) {
    results.sort((a, b) => {
      let comparison = 0;

      if (sort === "name") {
        comparison = a.name.localeCompare(b.name);
      }

      if (sort === "prep_time") {
        comparison = a.prep_time - b.prep_time;
      }

      if (sort === "difficulty") {
        comparison = a.difficulty - b.difficulty;
      }

      if (sort === "date_added") {
        comparison =
          new Date(a.date_added) - new Date(b.date_added);
      }

      return order === "desc" ? -comparison : comparison;
    });
  }

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`Recipe Box API running on http://localhost:${PORT}`);
});