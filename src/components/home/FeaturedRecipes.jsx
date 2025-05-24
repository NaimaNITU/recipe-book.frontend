import { Link } from "react-router-dom";
import RecipeList from "../recipe/RecipeList";

const FeaturedRecipes = ({ recipes, onLike }) => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Top Recipes
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Most liked recipes from our community
            </p>
          </div>
        </div>

        <RecipeList
          recipes={recipes}
          onLike={onLike}
          emptyMessage="No featured recipes yet. Be the first to add one!"
        />
        <div className="flex justify-center items-center my-8">
          <Link to="/all-recipes" className="btn btn-primary mt-4 sm:mt-0">
            See All Recipes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;
