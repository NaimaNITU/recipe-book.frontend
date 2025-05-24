import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";
import toast from "react-hot-toast";

const RecipeList = ({
  recipes: initialRecipes,
  emptyMessage = "No recipes found.",
}) => {
  const [recipes, setRecipes] = useState(initialRecipes || []);

  useEffect(() => {
    setRecipes(initialRecipes);
  }, [initialRecipes]);

  const handleLike = async (recipeId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/${recipeId}/like`,
        {
          method: "PATCH",
        }
      );

      if (!res.ok) throw new Error("Failed to like recipe");

      const updatedRecipe = await res.json();

      // Update local state
      setRecipes((prev) =>
        prev.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
      );
    } catch (err) {
      toast.error(err.message || "Error liking recipe");
    }
  };

  if (!recipes || recipes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} onLike={handleLike} />
      ))}
    </div>
  );
};

export default RecipeList;
