import React from "react";

const DonationRequestDetails  = () => {
  // Static data
  const request = {
    recipient_name: "Rahim Uddin",
    recipient_district: "Dhaka",
    recipient_upazila: "Dhanmondi",
    hospital_name: "Dhaka Medical College Hospital",
    full_address: "Zahir Raihan Rd, Dhaka",
    blood_group: "A+",
    donation_date: "2025-12-20",
    donation_time: "10:00 AM",
    request_message: "Urgent blood required for surgery",
    status: "pending", // Change to 'inprogress', 'done', 'canceled' to test
    donor_name: "Sajib Hossain",
    donor_email: "sajib@example.com",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Donation Request Details</h2>

      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Recipient Information</h3>
        <p><strong>Name:</strong> {request.recipient_name}</p>
        <p><strong>District:</strong> {request.recipient_district}</p>
        <p><strong>Upazila:</strong> {request.recipient_upazila}</p>
        <p><strong>Hospital:</strong> {request.hospital_name}</p>
        <p><strong>Address:</strong> {request.full_address}</p>
        <p><strong>Blood Group:</strong> {request.blood_group}</p>
        <p><strong>Donation Date:</strong> {request.donation_date}</p>
        <p><strong>Donation Time:</strong> {request.donation_time}</p>
        <p><strong>Request Message:</strong> {request.request_message}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={
            request.status === "pending" ? "text-yellow-600" :
            request.status === "inprogress" ? "text-blue-600" :
            request.status === "done" ? "text-green-600" : "text-red-600"
          }>
            {request.status}
          </span>
        </p>
      </div>

      {request.status === "inprogress" && (
        <div className="bg-white shadow-md rounded p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">Donor Information</h3>
          <p><strong>Name:</strong> {request.donor_name}</p>
          <p><strong>Email:</strong> {request.donor_email}</p>
        </div>
      )}

      {request.status === "pending" && (
        <div className="flex justify-center">
          <button className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition">
            Donate
          </button>
        </div>
      )}

      {request.status === "inprogress" && (
        <div className="flex justify-center gap-4">
          <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition">
            Mark Done
          </button>
          <button className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails ;
