import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");
// XSrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
  //  TanStack Query ->>> data fetch
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-users", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/users${filter ? `?status=${filter}` : ""}`,
      );
      return data;
    },
  });

  //  Block / Unblock
  const handleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "blocked" ? "active" : "blocked";

    const result = await Swal.fire({
      title: "Are you sure?",
      text:
        newStatus === "blocked"
          ? "User will be blocked!"
          : "User will be unblocked!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      confirmButtonText: "Yes!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}/status`, { status: newStatus });
        refetch(); // ✅ Table refresh
        Swal.fire("Done!", `User ${newStatus} successfully`, "success");
      } catch (error) {
        Swal.fire("Error!", "Something went wrong", "error");
      }
    }
  };

  //  Role Change
  const handleRole = async (id, role) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `User will be ${role}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      confirmButtonText: "Yes!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.patch(`/users/${id}/role`, { role });
        refetch(); //  Table refresh
        Swal.fire("Done!", `User is now ${role}`, "success");
      } catch (error) {
        Swal.fire("Error!", "Something went wrong", "error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <h2 className="text-3xl font-medium mb-4 text-center text-red-700">
        All Users
      </h2>

      {/*  Filter Buttons */}
      <div className="mb-4 flex justify-end gap-2">
        {["", "active", "blocked"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm border transition-all
              ${
                filter === f
                  ? "bg-red-600 text-white border-red-600"
                  : "border-gray-200 text-gray-600 bg-white"
              }`}
          >
            {f === "" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Avatar</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-red-50"}
              >
                <td className="py-3 px-4">{idx + 1}</td>

                <td className="py-3 px-4">
                  {/* avatar */}
                  <img
                    src={user.image || "https://i.pravatar.cc/100"} //  avatar
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  
                </td>

                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4 text-gray-500">{user.email}</td>

                {/*  Role Badge */}
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      user.role === "admin"
                        ? "bg-green-100 text-green-800"
                        : user.role === "volunteer"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                {/*  Status Badge */}
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      user.status === "blocked"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>

                {/*  Action Buttons */}
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-2">
                    {/* Block / Unblock */}
                    <button
                      onClick={() =>
                        handleStatus(user._id, user.status || "active")
                      }
                      className={`px-3 py-1 rounded-lg text-white text-xs
                        ${
                          user.status === "blocked"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                      {user.status === "blocked" ? "Unblock" : "Block"}
                    </button>

                    {/*  Make Volunteer --> donor   */}
                    {user.role === "donor" && (
                      <button
                        onClick={() => handleRole(user._id, "volunteer")}
                        className="px-3 py-1 rounded-lg bg-blue-500 
                        hover:bg-blue-600 text-white text-xs"
                      >
                        Make Volunteer
                      </button>
                    )}

                   
                    {user.role !== "admin" && (
                      <button
                        onClick={() => handleRole(user._id, "admin")}
                        className="px-3 py-1 rounded-lg bg-purple-500 
                        hover:bg-purple-600 text-white text-xs"
                      >
                        Make Admin
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
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
 



