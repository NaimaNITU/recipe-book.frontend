import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import PrivateRoute from "./PrivateRoute";

// Pages
import Home from "../pages/Home";
import AllRecipes from "../pages/AllRecipes";
import AddRecipe from "../pages/AddRecipe";
import MyRecipes from "../pages/MyRecipes";
import RecipeDetails from "../pages/RecipeDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import About from "../pages/About";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import Overview from "../pages/Dashboard/Overview";
import AllItems from "../pages/Dashboard/AllItems";
import AddItem from "../pages/Dashboard/AddItem";
import MyItems from "../pages/Dashboard/MyItems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "all-recipes", element: <AllRecipes /> },
      {
        path: "add-recipe",
        element: (
          <PrivateRoute>
            <AddRecipe />
          </PrivateRoute>
        ),
      },
      {
        path: "my-recipes",
        element: (
          <PrivateRoute>
            <MyRecipes />
          </PrivateRoute>
        ),
      },
      {
        path: "recipe/:_id",
        element: (
          <PrivateRoute>
            <RecipeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "all-items", element: <AllItems /> },
      { path: "add-item", element: <AddItem /> },
      { path: "my-items", element: <MyItems /> },
    ],
  },
]);

export default router;
