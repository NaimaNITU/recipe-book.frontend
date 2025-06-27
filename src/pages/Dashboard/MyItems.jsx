import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const MyItems = () => {
  const { user } = useAuth();
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchMyItems = async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/recipes/my-items/${
          user.uid
        }?_=${Date.now()}`
      );
      const data = await res.json();
      setMyItems(data);
      setLoading(false);
    };

    fetchMyItems();
  }, [user?.uid]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Items</h1>
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
          {myItems.length ? (
            myItems.map((item) => (
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
                You don't have any items yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MyItems;
