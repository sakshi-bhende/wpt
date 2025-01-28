import React, { useState } from "react";

const UserCRUD = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = form;
      setUsers(updatedUsers);
      setEditingIndex(null);
    } else {
      setUsers([...users, form]);
    }
    setForm({ firstName: "", lastName: "", email: "" });
  };

  const handleEdit = (index) => {
    setForm(users[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "16px", maxWidth: "400px", margin: "auto" }}>
      <h1 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>User Management</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
        <input name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        <input name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px" }} />
        <button type="submit" style={{ padding: "8px", backgroundColor: "blue", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>{editingIndex !== null ? "Update" : "Add"} User</button>
      </form>
      {users.map((user, index) => (
        <div key={index} style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", marginBottom: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <p>{user.firstName} {user.lastName}</p>
            <p style={{ fontSize: "14px", color: "gray" }}>{user.email}</p>
          </div>
          <div>
            <button onClick={() => handleEdit(index)} style={{ marginRight: "8px", padding: "4px 8px", backgroundColor: "green", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
            <button onClick={() => handleDelete(index)} style={{ padding: "4px 8px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCRUD;
