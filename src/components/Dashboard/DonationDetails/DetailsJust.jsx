import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

const DetailsJust = () => {
  const { id } = useParams();
  const { user } = useAuth();
const navigate =useNavigate()
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDonateDisabled, setIsDonateDisabled] = useState(true); 

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests/${id}`
        );
        setRequest(res.data);

        // Optionally, enable donate only for admin
        if (user?.role === "admin") {
          setIsDonateDisabled(false);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id, user]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!request) return <p className="text-center mt-10">Request not found</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Donation Request Details</h1>

      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-xl font-semibold mb-2">{request.recipientName}</h2>
        <p className="mb-1"><strong>Location:</strong> {request.recipientUpazila}, {request.fullAddress}</p>
        <p className="mb-1"><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p className="mb-1"><strong>Hospital:</strong> {request.hospitalName}</p>
        <p className="mb-1"><strong>Date:</strong> {request.donationDate} | <strong>Time:</strong> {request.donationTime}</p>
        <p className="mb-3"><strong>Message:</strong> {request.requestMessage}</p>

        {/* <button
          disabled={isDonateDisabled}
          className={`w-full px-4 py-2 rounded-md text-white transition
            ${isDonateDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
        >
          Donate
        </button> */}
         {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 px-10 py-3 rounded-full font-semibold"
          >
            Back
          </button>

        {isDonateDisabled && (
          <p className="text-sm text-gray-500 mt-2 text-center">
            Only admin can donate
          </p>
        )}
      </div>
    </div>
  );
};

export default DetailsJust;
