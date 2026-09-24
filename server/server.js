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
  const { search } = req.query;

  if (!search) {
    return res.json(recipes);
  }

  const searchTerm = search.toLowerCase();

  const filteredRecipes = recipes.filter((recipe) => {
    return (
      recipe.name.toLowerCase().includes(searchTerm) ||
      recipe.cuisine.toLowerCase().includes(searchTerm)
    );
  });

  res.json(filteredRecipes);
});

app.listen(PORT, () => {
  console.log(`Recipe Box API running on http://localhost:${PORT}`);
});