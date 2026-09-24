import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/recipes")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <div>
      <h1>Recipe Box</h1>

      <p>Recipes: {recipes.length}</p>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            {recipe.name} — {recipe.cuisine}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;