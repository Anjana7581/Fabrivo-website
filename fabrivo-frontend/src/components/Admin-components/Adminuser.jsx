import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import "./Adminuser.css";

function Adminuser() {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    // const [newUser, setNewUser] = useState({ name: "", email: "" });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get("/users");
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/users/${id}`);
            setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/users/${editingUser.id}`, editingUser);
            setUsers(users.map((user) => (user.id === editingUser.id ? editingUser : user)));
            setEditingUser(null);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // const handleCreate = async () => {
    //     try {
    //         const response = await axiosInstance.post("/users", newUser);
    //         setUsers([...users, response.data]);
    //         setNewUser({ name: "", email: "" });
    //     } catch (error) {
    //         console.error("Error creating user:", error);
    //     }
    // };

    return (
        <div className="admin-user-container">
            <h1 className="admin-user-title">Manage Users</h1>

            {/* Create New User */}
            {/* <div className="create-user-form">
                <h2>Create New User</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <button onClick={handleCreate} className="btn btn-create">
                    Create
                </button>
            </div> */}

            <table className="admin-user-table">
                <thead className="admin-user-thead">
                    <tr>
                        <th className="admin-user-th">ID</th>
                        <th className="admin-user-th">Name</th>
                        <th className="admin-user-th">Email</th>
                        <th className="admin-user-th">Actions</th>
                    </tr>
                </thead>
                <tbody className="admin-user-tbody">
                    {users.map((user) => (
                        <tr key={user.id} className="admin-user-row">
                            <td className="admin-user-td">{user.id}</td>
                            <td className="admin-user-td">
                                {editingUser && editingUser.id === user.id ? (
                                    <input
                                        type="text"
                                        value={editingUser.name}
                                        onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td className="admin-user-td">
                                {editingUser && editingUser.id === user.id ? (
                                    <input
                                        type="email"
                                        value={editingUser.email}
                                        onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="admin-user-td">
                                {editingUser && editingUser.id === user.id ? (
                                    <button onClick={handleUpdate} className="btn btn-save">
                                        Save
                                    </button>
                                ) : (
                                    <button onClick={() => handleEdit(user)} className="btn btn-edit">
                                        Edit
                                    </button>
                                )}
                                <button onClick={() => handleDelete(user.id)} className="btn btn-delete">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Adminuser;
