import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = import.meta.env.VITE_API_URL;

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API);
      setItems(res.data);
    } catch (error) {
      toast.error("Failed to load items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Item cannot be empty");
      return;
    }

    try {
      if (editId) {
        await axios.put(API + editId + "/", { name });
        toast.success("Item updated");
        setEditId(null);
      } else {
        await axios.post(API, { name });
        toast.success("Item added");
      }

      setName("");
      fetchItems();
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(API + id + "/");
      toast.success("Item deleted");
      fetchItems();
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleToggle = async (id) => {
    try {
      await axios.post(API + id + "/toggle/");
      fetchItems();
    } catch {
      toast.error("Toggle failed");
    }
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditId(item.id);
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" />

      <h1>Grocery Bud 🛒</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter item"
        />

        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span
              className={item.completed ? "completed" : ""}
              onClick={() => handleToggle(item.id)}
            >
              {item.name}
            </span>

            <div>
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
