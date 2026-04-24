import axios from "axios";
import { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");

  // get users from backend
  useEffect(() => {
    const getUsers = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  // frontend only (later backend API will be added)
  const toggleBlock = async (id, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${id}/status`,
        { status: newStatus }
      );

      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: newStatus } : user
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${id}/role`,
        { role }
      );

      setUsers((prev) =>
        prev.map((user) => (user._id === id ? { ...user, role } : user))
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update role");
    }
  };

  // filtering users by status (active / blocked)
  const filteredUsers = users.filter((user) => {
    if (statusFilter === "all") return true;
    return (user.status || "active") === statusFilter;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center text-red-700">
        All Users
      </h2>

      {/* Status Filter */}
      <div className="mb-4 flex justify-end">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded focus:outline-none"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Avatar</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b hover:bg-gray-50 transition duration-150"
              >
                <td className="py-3 px-4">
                  <img
                    src={user.image || "https://i.pravatar.cc/100"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.email}</td>
                <td className="py-3 px-4 capitalize">{user.role}</td>

                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-white text-sm ${
                      (user.status || "active") === "blocked"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                <td className="py-3 px-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => toggleBlock(user._id, user.status)}
                    className={`px-3 py-1 rounded text-white text-sm ${
                      (user.status || "active") === "blocked"
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {(user.status || "active") === "blocked"
                      ? "Unblock"
                      : "Block"}
                  </button>

                  <button
                    onClick={() => changeRole(user._id, "volunteer")}
                    className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm"
                  >
                    Make Volunteer
                  </button>

                  <button
                    onClick={() => changeRole(user._id, "admin")}
                    className="px-3 py-1 rounded bg-purple-500 hover:bg-purple-600 text-white text-sm"
                  >
                    Make Admin
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
