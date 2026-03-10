import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API = "http://127.0.0.1:8000/api/grocery/";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    const res = await axios.get(API);
    setItems(res.data);
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
    await axios.delete(API + id + "/");
    toast.success("Item deleted");
    fetchItems();
  };

  const handleToggle = async (id) => {
    await axios.post(API + id + "/toggle/");
    fetchItems();
  };

  const handleEdit = (item) => {
    setName(item.name);
    setEditId(item.id);
  };

  return (
    <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
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

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ marginTop: "10px" }}>
            <span
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleToggle(item.id)}
            >
              {item.name}
            </span>

            <button onClick={() => handleEdit(item)}>Edit</button>

            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
