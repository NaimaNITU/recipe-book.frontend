import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AddItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    cuisineType: "",
    categories: "",
    ingredients: "",
    instructions: "",
    preparationTime: "",
    price: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.uid) {
      toast.error("You must be logged in to add a recipe.");
      return;
    }

    const dataToSend = {
      ...formData,
      userId: user.uid, // ✅ dynamic user ID
      categories: formData.categories.split(",").map((c) => c.trim()),
      ingredients: formData.ingredients.split("\n").filter((i) => i.trim()),
      instructions: formData.instructions.split("\n").filter((i) => i.trim()),
      price: parseFloat(formData.price) || 0,
      preparationTime: parseInt(formData.preparationTime) || 0,
      likeCount: 0,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) {
        throw new Error("Failed to add recipe");
      }

      toast.success("Recipe added successfully!");
      navigate("/dashboard/my-items", { replace: true });
    } catch (error) {
      console.error("Error adding recipe:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Add New Recipe</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="input input-bordered w-full"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.image}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cuisineType"
          placeholder="Cuisine Type (e.g., Italian)"
          className="input input-bordered w-full"
          value={formData.cuisineType}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="categories"
          placeholder="Categories (comma separated)"
          className="input input-bordered w-full"
          value={formData.categories}
          onChange={handleChange}
        />
        <textarea
          name="ingredients"
          placeholder="Ingredients (one per line)"
          className="textarea textarea-bordered w-full md:col-span-2"
          rows={4}
          value={formData.ingredients}
          onChange={handleChange}
        ></textarea>
        <textarea
          name="instructions"
          placeholder="Instructions (one per line)"
          className="textarea textarea-bordered w-full md:col-span-2"
          rows={4}
          value={formData.instructions}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="preparationTime"
          placeholder="Preparation Time (in minutes)"
          className="input input-bordered w-full"
          value={formData.preparationTime}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Estimated Price"
          className="input input-bordered w-full"
          value={formData.price}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary md:col-span-2">
          Add Recipe
        </button>
      </form>
    </div>
  );
};

export default AddItem;
