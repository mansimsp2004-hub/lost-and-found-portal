
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [form, setForm] = useState({
    itemName: "",
    category: "Electronics",
    description: "",
    location: "",
    type: "Lost",
    contactName: "",
    contactEmail: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadItems() {
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Unable to load items");
      setItems(await response.json());
    } catch {
      setMessage("Cannot connect to server. Start the backend first.");
    }
  }

  useEffect(() => {
    loadItems();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const url = editingId ? `${API}/${editingId}` : API;
      const response = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Request failed");

      setMessage(editingId ? "Item updated successfully!" : "Item reported successfully!");
      resetForm();
      await loadItems();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setForm({
      itemName: "",
      category: "Electronics",
      description: "",
      location: "",
      type: "Lost",
      contactName: "",
      contactEmail: "",
    });
    setEditingId(null);
  }

  function editItem(item) {
    setForm({
      itemName: item.itemName,
      category: item.category,
      description: item.description,
      location: item.location,
      type: item.type,
      contactName: item.contactName,
      contactEmail: item.contactEmail,
    });
    setEditingId(item._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function updateStatus(item) {
    const status = item.status === "Returned" ? "Pending" : "Returned";

    try {
      const response = await fetch(`${API}/${item._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Update failed");
      setMessage("Item status updated!");
      await loadItems();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteItem(id) {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Delete failed");
      setMessage("Item deleted successfully!");
      await loadItems();
    } catch (error) {
      setMessage(error.message);
    }
  }

  const filteredItems = items.filter((item) => {
    const text = `${item.itemName} ${item.category} ${item.location}`.toLowerCase();
    return (
      text.includes(search.toLowerCase()) &&
      (filter === "All" || item.type === filter)
    );
  });

  return (
    <div className="app">
      <nav className="navbar">
        <a className="brand" href="#home">🔎 Lost & Found</a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#report">Report Item</a>
          <a href="#listings">Browse Items</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <span className="eyebrow">COMMUNITY HELPING COMMUNITY</span>
        <h1>Lost something?<br />Let's find it together.</h1>
        <p>
          A simple place to report lost belongings, share found items,
          and help reunite people with what matters to them.
        </p>
        <a className="hero-btn" href="#report">+ Report an Item</a>

        <div className="stats">
          <div><strong>{items.length}</strong><span>Total Reports</span></div>
          <div><strong>{items.filter(i => i.type === "Lost").length}</strong><span>Lost Items</span></div>
          <div><strong>{items.filter(i => i.type === "Found").length}</strong><span>Found Items</span></div>
          <div><strong>{items.filter(i => i.status === "Returned").length}</strong><span>Returned</span></div>
        </div>
      </section>

      <main className="container">
        <section className="report-section" id="report">
          <div className="section-heading">
            <span className="eyebrow">MAKE A REPORT</span>
            <h2>{editingId ? "Edit Item Report" : "Report a Lost or Found Item"}</h2>
            <p>Share the details so the community can help.</p>
          </div>

          {message && <div className="message" role="status">{message}</div>}

          <form className="report-form" onSubmit={handleSubmit}>
            <label>
              Item Name *
              <input name="itemName" value={form.itemName} onChange={handleChange}
                placeholder="e.g. College ID Card" required maxLength="100" />
            </label>

            <label>
              Category *
              <select name="category" value={form.category} onChange={handleChange}>
                <option>Electronics</option>
                <option>Documents</option>
                <option>Accessories</option>
                <option>Bags</option>
                <option>Keys</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Report Type *
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="Lost">Lost Item</option>
                <option value="Found">Found Item</option>
              </select>
            </label>

            <label>
              Location *
              <input name="location" value={form.location} onChange={handleChange}
                placeholder="Where was it lost or found?" required maxLength="150" />
            </label>

            <label className="full-width">
              Description *
              <textarea name="description" value={form.description} onChange={handleChange}
                placeholder="Describe the item and identifying details..." required maxLength="1000" />
            </label>

            <label>
              Your Name *
              <input name="contactName" value={form.contactName} onChange={handleChange}
                placeholder="Enter your name" required maxLength="100" />
            </label>

            <label>
              Email *
              <input name="contactEmail" type="email" value={form.contactEmail}
                onChange={handleChange} placeholder="you@example.com" required maxLength="254" />
            </label>

            <div className="form-actions full-width">
              <button className="primary-btn" disabled={loading}>
                {loading ? "Saving..." : editingId ? "Save Changes" : "Submit Report"}
              </button>
              {editingId && (
                <button type="button" className="cancel-btn" onClick={resetForm}>
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="listings-section" id="listings">
          <div className="section-heading">
            <span className="eyebrow">COMMUNITY LISTINGS</span>
            <h2>Browse Reported Items</h2>
            <p>Search the listings to see if your missing item has been reported.</p>
          </div>

          <div className="toolbar">
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search by name, category or location..." />
            <select value={filter} onChange={e => setFilter(e.target.value)}>
              <option value="All">All Items</option>
              <option value="Lost">Lost Items</option>
              <option value="Found">Found Items</option>
            </select>
          </div>

          <div className="item-grid">
            {filteredItems.map(item => (
              <article className="item-card" key={item._id}>
                <div className="card-top">
                  <span className={`type-badge ${item.type.toLowerCase()}`}>{item.type}</span>
                  <span className={`status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
                <div className="item-icon">
                  {item.category === "Electronics" ? "📱" :
                    item.category === "Documents" ? "🪪" :
                    item.category === "Bags" ? "🎒" :
                    item.category === "Keys" ? "🔑" : "📦"}
                </div>
                <h3>{item.itemName}</h3>
                <p className="category">{item.category}</p>
                <p>{item.description}</p>
                <p>📍 {item.location}</p>
                <p className="contact">Reported by: {item.contactName}</p>
                <div className="card-actions">
                  <button onClick={() => editItem(item)} className="edit-btn">Edit</button>
                  <button onClick={() => updateStatus(item)} className="primary-btn">
                    {item.status === "Returned" ? "Mark Pending" : "Mark Returned"}
                  </button>
                  <button onClick={() => deleteItem(item._id)} className="delete-btn">Delete</button>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="empty-state">
              <div>🔎</div>
              <h3>No items found</h3>
              <p>Try another search or submit a new report.</p>
            </div>
          )}
        </section>
      </main>

      <footer>
        <h3>🔎 Lost & Found Portal</h3>
        <p>Helping belongings find their way home.</p>
        <small>Academic MERN Stack Case Study Project</small>
      </footer>
    </div>
  );
}

export default App;
