import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import CardComponent from "../components/CardComponent";

interface User {
  id: number;
  name: string;
  email: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [updateUser, setUpdateUser] = useState({ id: "", name: "", email: "" });

  // Fetch users
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data.reverse());
      } catch (err) {
        const error = err as AxiosError;
        console.error("❌ Error fetching users:", error.message);
        alert("Failed to fetch users. Please check your API server.");
      }
    };

    fetchData();
  }, []);

  // Create user
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post("/users", newUser);
      setUsers([response.data, ...users]);
      setNewUser({ name: "", email: "" });
    } catch (err) {
      const error = err as AxiosError;
      console.error("❌ Error creating user:", error.message);
      alert("Failed to create user.");
    }
  };

  // Update user
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await api.put(`/users/${updateUser.id}`, {
        name: updateUser.name,
        email: updateUser.email,
      });
      setUpdateUser({ id: "", name: "", email: "" });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === parseInt(updateUser.id)
            ? { ...user, name: updateUser.name, email: updateUser.email }
            : user
        )
      );
    } catch (err) {
      const error = err as AxiosError;
      console.error("❌ Error updating user:", error.message);
      alert("Failed to update user.");
    }
  };

  // Delete user
  const deleteUser = async (userId: number) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      const error = err as AxiosError;
      console.error("❌ Error deleting user:", error.message);
      alert("Failed to delete user.");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="space-y-4 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          User Management App
        </h1>

        {/* Create user */}
        <form onSubmit={createUser} className="p-4 bg-blue-100 rounded shadow">
          <input
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="mb-2 w-full p-2 border border-gray-300 rounded text-gray-900"
          />
          <input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="mb-2 w-full p-2 border border-gray-300 rounded text-gray-900"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </form>

        {/* Update user */}
        <form
          onSubmit={handleUpdateUser}
          className="p-4 bg-green-100 rounded shadow"
        >
          <input
            placeholder="User ID"
            value={updateUser.id}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, id: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded text-gray-900"
          />
          <input
            placeholder="New Name"
            value={updateUser.name}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, name: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded text-gray-900"
          />
          <input
            placeholder="New Email"
            value={updateUser.email}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, email: e.target.value })
            }
            className="mb-2 w-full p-2 border border-gray-300 rounded text-gray-900"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-green-500 rounded hover:bg-green-600"
          >
            Update User
          </button>
        </form>

        {/* Display users */}
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
            >
              <CardComponent card={user} />
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
              >
                Delete User
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
