import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = `http://localhost:5000/api/recipes?search=${search}`;

        if (sort) {
          const order = sort === "date_added" ? "desc" : "asc";
          url += `&sort=${sort}&order=${order}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [search, sort]);

  return (
    <div>
      <h1>Recipe Box</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <select
        value={sort}
        onChange={(event) => setSort(event.target.value)}
      >
        <option value="">Sort recipes...</option>
        <option value="name">Name A–Z</option>
        <option value="prep_time">Shortest Prep Time</option>
        <option value="difficulty">Easiest First</option>
        <option value="date_added">Newest Added</option>
      </select>

      <p>Showing {recipes.length} recipes</p>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <div className="recipe-list">
  {recipes.map((recipe) => (
    <article className="recipe-card" key={recipe._id}>
      <h2>{recipe.name}</h2>

      <p>
        <strong>Cuisine:</strong> {recipe.cuisine}
      </p>

      <p>
        <strong>Prep Time:</strong> {recipe.prep_time} minutes
      </p>

      <p>
        <strong>Difficulty:</strong> {recipe.difficulty}/5
      </p>

      <p>
        <strong>Servings:</strong> {recipe.servings}
      </p>

      <p>
        <strong>Date Added:</strong>{" "}
        {new Date(recipe.date_added).toLocaleDateString()}
      </p>
    </article>
  ))}
</div>
      )}
    </div>
  );
}

export default App;
