import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");

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

  return (
    <div>
      <h1>Recipe Box</h1>

      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      <p>Showing {recipes.length} recipes</p>

      {recipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul>
          {recipes.map((recipe) => (
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