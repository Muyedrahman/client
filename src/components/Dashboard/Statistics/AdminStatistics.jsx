import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const AdminStatistics = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recent 3 donation requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests`,
          {
            params: {
              email: user?.email,
              limit: 3,
            },
          }
        );
        setRequests(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchRequests();
  }, [user?.email]);

  // Status update
  const updateStatus = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
        { status }
      );

      setRequests((prev) =>
        prev.map((req) => (req._id === id ? { ...req, status } : req))
      );

      toast.success(`Marked as ${status}`);
    } catch (err) {
      toast.error("Status update failed");
    }
  };
  console.log(requests);
  // Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donation request?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}`
      );
      setRequests((prev) => prev.filter((req) => req._id !== id));
      toast.success("Delete successful");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        👋 Welcome, {user?.displayName}!
      </h1>

      <div className="bg-white shadow-md rounded-xl p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">
          Your Recent Donation Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-100">
                <th>#</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Date & Time</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req, idx) => (
                <tr key={req._id}>
                  <td>{idx + 1}</td>

                  {/* Recipient */}
                  <td className="font-semibold">{req?.requesterName}</td>

                  {/* Location */}
                  <td>
                    {req.district}, {req.upazila}
                  </td>

                  {/* Date & Time */}
                  <td>
                    {req.donationDate}
                    <br />
                    <span className="text-sm text-gray-500">
                      {req.donationTime}
                    </span>
                  </td>

                  {/* Blood */}
                  <td>{req.bloodGroup}</td>

                  {/* Status */}
                  <td>
                    {req.status === "pending" && (
                      <span className="badge badge-warning">Pending</span>
                    )}
                    {req.status === "inprogress" && (
                      <span className="badge badge-primary">In Progress</span>
                    )}
                    {req.status === "done" && (
                      <span className="badge badge-success">Done</span>
                    )}
                    {req.status === "canceled" && (
                      <span className="badge badge-error">Canceled</span>
                    )}
                  </td>

                  {/* Donor Info */}
                  <td>
                    {req.status === "inprogress" ? (
                      <div>
                        <p className="font-semibold">{user?.displayName}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">—</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="flex flex-wrap gap-2">
                    {/* View */}
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

                    {/* Edit */}
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

                    {/* Delete */}
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(req._id)}
                    >
                      Delete
                    </button>

                    {/* Done / Cancel only for inprogress */}
                    {req.status === "inprogress" && (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => updateStatus(req._id, "done")}
                        >
                          Done
                        </button>
                        <button
                          className="btn btn-outline btn-sm"
                          onClick={() => updateStatus(req._id, "canceled")}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* View All */}
          <div className="mt-6 text-center">
            <Link to="my-donation-request">
              <button className="btn btn-neutral">View My All Requests</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
