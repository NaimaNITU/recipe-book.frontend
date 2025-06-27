import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Overview = () => {
  const { user } = useAuth();
  const [totalItems, setTotalItems] = useState(0);
  const [myItemsCount, setMyItemsCount] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch total items
        const resAll = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/recipes`
        );
        const allItems = await resAll.json();
        setTotalItems(allItems.length);

        // Fetch my items count
        if (user?.uid) {
          const resMy = await fetch(
            `${import.meta.env.VITE_API_BASE_URL}/recipes/my-items/${user.uid}`
          );
          const myItems = await resMy.json();
          setMyItemsCount(myItems.length);
        }
      } catch (error) {
        console.error("Failed to fetch stats", error);
      }
    }

    fetchStats();
  }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="card bg-primary text-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Total Items</h3>
          <p className="text-3xl">{totalItems}</p>
        </div>
        <div className="card bg-secondary text-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">My Items</h3>
          <p className="text-3xl">{myItemsCount}</p>
        </div>
        <div className="card bg-accent text-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Welcome,</h3>
          <p className="text-lg">{user?.displayName || user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
