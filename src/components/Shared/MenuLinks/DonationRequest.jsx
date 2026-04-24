import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DonationRequest = () => {
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

  if (loading) {
    return <p className="text-center mt-10">Loading donation requests...</p>;
  }

  if (!requests.length) {
    return (
      <p className="text-center mt-10">No pending donation requests found.</p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Pending Donation Requests
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req._id}
            className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{req.recipientName}</h2>

            <p>
              <strong>Location:</strong> {req.recipientUpazila},{" "}
              {req.fullAddress}
            </p>
            <p>
              <strong>Blood Group:</strong> {req.bloodGroup}
            </p>
            <p>
              <strong>Hospital:</strong> {req.hospitalName}
            </p>
            <p>
              <strong>Date:</strong> {req.donationDate} | <strong>Time:</strong>{" "}
              {req.donationTime}
            </p>

            <p className="mb-3">
              <strong>Message:</strong> {req.requestMessage}
            </p>

            {/* ✅ Updated Link to match your route */}
            <Link to={`/dashboard/all-users/details-just/${req._id}`}>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequest;
