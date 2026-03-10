import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://127.0.0.1:8000/api/grocery";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Load items from API on mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`${BASE_URL}/`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setItems(data);
      } catch {
        toast.error("Could not load grocery list");
      }
    };
    fetchItems();
  }, []);

  const addItem = async () => {
    if (!inputValue.trim()) return;
    try {
      const res = await fetch(`${BASE_URL}/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputValue, completed: false }),
      });
      if (!res.ok) throw new Error();
      const newItem = await res.json();
      setItems((prev) => [...prev, newItem.data]);
      setInputValue("");
      toast.success("Item added!");
    } catch {
      toast.error("Could not add item");
    }
  };

  const editCompleted = async (itemId) => {
    try {
      const res = await fetch(`${BASE_URL}/${itemId}/toggle/`, {
        method: "POST",
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setItems((prev) =>
        prev.map((item) => (item.id === itemId ? updated.data : item)),
      );
    } catch {
      toast.error("Could not update item");
    }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await fetch(`${BASE_URL}/${itemId}/`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setItems((prev) => prev.filter((item) => item.id !== itemId));
      toast.success("Item deleted");
    } catch {
      toast.error("Could not delete item");
    }
  };

  const updateItemName = async (newName) => {
    try {
      const res = await fetch(`${BASE_URL}/${editId}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setItems((prev) =>
        prev.map((item) => (item.id === editId ? updated.data : item)),
      );
      setEditId(null);
      toast.success("Item updated!");
    } catch {
      toast.error("Could not update item");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" />
      <h1>Grocery Bud 🛒</h1>
      <div className="form">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="Add grocery item..."
        />
        <button onClick={addItem}>Add</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            {editId === item.id ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
                <button onClick={() => updateItemName(editValue)}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span onClick={() => editCompleted(item.id)}>{item.name}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditId(item.id);
                      setEditValue(item.name);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => removeItem(item.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
