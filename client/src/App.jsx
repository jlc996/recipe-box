import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/recipes?search=${search}`
        );

        const data = await response.json();

        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [search]);

  const sortedRecipes = [...recipes].sort((a, b) => {
    if (sort === "name") {
      return a.name.localeCompare(b.name);
    }

    if (sort === "prep_time") {
      return a.prep_time - b.prep_time;
    }

    if (sort === "difficulty") {
      return a.difficulty - b.difficulty;
    }

    if (sort === "date_added") {
      return new Date(b.date_added) - new Date(a.date_added);
    }

    return 0;
  });

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

      <p>Showing {sortedRecipes.length} recipes</p>

      {sortedRecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {sortedRecipes.map((recipe) => (
            <li key={recipe.id}>
              <strong>{recipe.name}</strong> — {recipe.cuisine}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;