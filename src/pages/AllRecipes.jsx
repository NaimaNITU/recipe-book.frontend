import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import RecipeList from "../components/recipe/RecipeList";
import toast from "react-hot-toast";
import { FiSearch } from "react-icons/fi";

const cuisineTypes = [
  "All",
  "Italian",
  "Mexican",
  "Indian",
  "Chinese",
  "American",
  "Thai",
  "Japanese",
  "French",
  "Mediterranean",
  "Others",
];

const AllRecipes = () => {
  const [searchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const categoryParam = searchParams.get("category");

  // Fetch recipes from API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/recipes`
        );
        const data = await response.json();
        setRecipes(data);

        if (categoryParam) {
          const filtered = data.filter((recipe) =>
            recipe.categories.includes(categoryParam)
          );
          setFilteredRecipes(filtered);
        } else {
          setFilteredRecipes(data);
        }
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
        toast.error("Failed to load recipes");
      }
    };

    fetchRecipes();
  }, [categoryParam]);

  // Filter & Sort
  useEffect(() => {
    let result = [...recipes];

    if (selectedCuisine !== "All") {
      result = result.filter(
        (recipe) => recipe.cuisineType === selectedCuisine
      );
    }

    if (categoryParam) {
      result = result.filter((recipe) =>
        recipe.categories.includes(categoryParam)
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (recipe) =>
          recipe.title.toLowerCase().includes(term) ||
          recipe.cuisineType.toLowerCase().includes(term) ||
          recipe.categories.some((cat) => cat.toLowerCase().includes(term))
      );
    }

    // Sort by title
    if (sortOrder === "asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredRecipes(result);
  }, [selectedCuisine, searchTerm, sortOrder, recipes, categoryParam]);

  const handleCuisineChange = (cuisine) => {
    setSelectedCuisine(cuisine);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  const handleLike = async (recipeId) => {
    try {
      // Demo-like logic
      setRecipes((prev) =>
        prev.map((r) =>
          r._id === recipeId ? { ...r, likeCount: r.likeCount + 1 } : r
        )
      );

      setFilteredRecipes((prev) =>
        prev.map((r) =>
          r._id === recipeId ? { ...r, likeCount: r.likeCount + 1 } : r
        )
      );

      toast.success("Liked the recipe!");
    } catch (error) {
      toast.error("Failed to like recipe");
    }
  };

  return (
    <div className="py-10">
      <div className="container">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {categoryParam ? `${categoryParam} Recipes` : "All Recipes"}
        </h1>

        {/* FILTER BAR */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 flex-wrap">
            {/* Left: Search */}
            <form onSubmit={handleSearch} className="relative w-full md:w-1/3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search recipes..."
                className="input input-bordered w-full pr-10"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <FiSearch size={18} />
              </button>
            </form>

            {/* Right: Sort + Cuisine Filter */}
            <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sort by:
                </span>
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="select select-bordered"
                >
                  <option value="default">Default</option>
                  <option value="asc">Title (A–Z)</option>
                  <option value="desc">Title (Z–A)</option>
                </select>
              </div>

              {/* Cuisine Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter by cuisine:
                </span>
                <select
                  value={selectedCuisine}
                  onChange={(e) => handleCuisineChange(e.target.value)}
                  className="select select-bordered"
                >
                  {cuisineTypes.map((cuisine) => (
                    <option key={cuisine} value={cuisine}>
                      {cuisine}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <RecipeList
          recipes={filteredRecipes}
          onLike={(id) => handleLike(id)}
          emptyMessage={
            searchTerm || selectedCuisine !== "All" || categoryParam
              ? "No recipes found matching your filters."
              : "No recipes found. Be the first to add one!"
          }
        />
      </div>
    </div>
  );
};

export default AllRecipes;
