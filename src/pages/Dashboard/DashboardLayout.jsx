import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // your useAuth hook
import Navbar from "../../components/shared/Navbar";

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen bg-base-100">
        <aside className="w-64 bg-base-200 p-6 space-y-6">
          <h2 className="text-2xl font-bold">Dashboard</h2>

          <nav className="flex flex-col space-y-2">
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                isActive ? "font-semibold text-primary" : "hover:text-primary"
              }
            >
              Overview
            </NavLink>
            <NavLink
              to="/dashboard/all-items"
              className={({ isActive }) =>
                isActive ? "font-semibold text-primary" : "hover:text-primary"
              }
            >
              All Items
            </NavLink>
            <NavLink
              to="/dashboard/add-item"
              className={({ isActive }) =>
                isActive ? "font-semibold text-primary" : "hover:text-primary"
              }
            >
              Add Item
            </NavLink>
            <NavLink
              to="/dashboard/my-items"
              className={({ isActive }) =>
                isActive ? "font-semibold text-primary" : "hover:text-primary"
              }
            >
              My Items
            </NavLink>
          </nav>

          <div className="mt-auto text-sm text-gray-600">
            Logged in as: <br />
            <span className="font-medium">
              {user?.displayName || user?.email}
            </span>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
