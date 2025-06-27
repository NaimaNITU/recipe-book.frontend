import { useEffect, useState } from "react";

const AllItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllItems() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/recipes`);
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Failed to fetch all items", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAllItems();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Items</h1>
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th>Title</th>
            <th>Cuisine</th>
            <th>Categories</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {items.length ? (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.cuisineType}</td>
                <td>{item.categories?.join(", ")}</td>
                <td>{item.price ? `$${item.price}` : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllItems;
