import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";

const ManageOrders = () => {
  const navigate = useNavigate();
  const [user] = useState(null);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests?status=pending`
        );
        setRequests(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleView = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/dashboard/all-users/donation-details/${id}`);
    }
  };

  return (
    <div className="min-h-screen bg-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-red-700 mb-8 text-center">
          Pending Donation Requests
        </h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
              <div key={req._id} className="bg-white p-6 rounded-3xl shadow-lg">
                <h3 className="text-xl font-semibold text-red-700 mb-2">
                  {req.requesterName}
                </h3>

                <p className="text-gray-600">
                  <b>Hospital:</b> {req.hospitalName}
                </p>

                <p className="text-gray-600">
                  <b>Upazila:</b> {req.recipientUpazila}
                </p>

                <p className="text-gray-600">
                  <b>Blood Group:</b> {req.bloodGroup}
                </p>

                <p className="text-gray-600">
                  <b>Date:</b> {req.donationDate}
                </p>

                <p className="text-gray-600 mb-4">
                  <b>Time:</b> {req.donationTime}
                </p>

                <Link to={`/dashboard/all-users/donation-details/${req._id}`}>
                  <button
                    onClick={() => handleView(req._id)}
                    className="w-full bg-red-500 text-white rounded-xl py-2 font-semibold hover:bg-red-600"
                  >
                    View
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
