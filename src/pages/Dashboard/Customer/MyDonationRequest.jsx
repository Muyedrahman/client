import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Frontend Pagination
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Fetch ALL data from backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests`,
          {
            params: {
              email: user?.email,
              status: filter !== "all" ? filter : undefined,
            },
          }
        );
        setRequests(data);
        setPage(1); // reset page when filter changes
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
  }, [user?.email, filter]);

  // Pagination calculation
  const totalPages = Math.ceil(requests.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedRequests = requests.slice(startIndex, endIndex);

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`
      );
      setRequests((prev) => prev.filter((req) => req._id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        My Donation Requests
      </h1>

      {/* Filter */}
      <div className="flex justify-center gap-2 mb-6">
        {["all", "pending", "inprogress", "done", "canceled"].map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? "btn-primary" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Recipient</th>
                <th>Blood</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedRequests.map((req, idx) => (
                <tr key={req._id}>
                  <td>{startIndex + idx + 1}</td>
                  <td>{req.requesterName}</td>
                  <td>{req.bloodGroup}</td>
                  <td>{req.donationDate}</td>
                  <td>
                    <span className="badge">{req.status}</span>
                  </td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() =>
                        navigate(
                          `/dashboard/all-users/donation-details/${req._id}`,
                          { state: { mode: "view" } }
                        )
                      }
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() =>
                        navigate(
                          `/dashboard/all-users/donation-details/${req._id}`,
                          { state: { mode: "edit" } }
                        )
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedRequests.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Buttons */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              « Prev
            </button>

            <span className="btn btn-sm btn-disabled">
              Page {page} / {totalPages}
            </span>

            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              Next »
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDonationRequests;
