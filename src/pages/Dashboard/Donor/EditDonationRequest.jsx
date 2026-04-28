// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const EditDonationRequest = () => {
  const { id } = useParams(); //  URL থেকে id নাও
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  //  Districts.json লোড
  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  //  পুরনো request data লোড
  const { data: request = {}, isLoading } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/donation-requests/${id}`);
      return data;
    },
  });

  //  পুরনো district অনুযায়ী upazila লোড
  useEffect(() => {
    if (request.recipientDistrict && districts.length > 0) {
      const found = districts.find((d) => d.name === request.recipientDistrict);
      setUpazilas(found ? found.upazilas : []);
    }
  }, [request.recipientDistrict, districts]);

  //  District পরিবর্তন হলে
  const handleDistrictChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const found = districts.find((d) => d.id === selectedId);
    setUpazilas(found ? found.upazilas : []);
  };

  //  Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      recipientName: form.recipientName.value,
      recipientDistrict:
        form.recipientDistrict.options[form.recipientDistrict.selectedIndex]
          .text,
      recipientUpazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
    };

    try {
      await axiosSecure.patch(`/donation-requests/${id}`, updatedData);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Donation request updated successfully.",
        confirmButtonColor: "#c0392b",
      });

      navigate("/dashboard/my-donation-requests");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Try again.",
        confirmButtonColor: "#c0392b",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        {/* Title */}
        <h2 className="text-2xl font-medium text-red-700 mb-6 text-center">
          Edit Donation Request 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Requester Name - Read Only */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Requester Name
            </label>
            <input
              type="text"
              defaultValue={request.requesterName}
              readOnly
              className="w-full border px-4 py-2 rounded-lg
              bg-gray-100 cursor-not-allowed text-gray-500"
            />
          </div>

          {/* Requester Email - Read Only */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Requester Email
            </label>
            <input
              type="email"
              defaultValue={request.requesterEmail}
              readOnly
              className="w-full border px-4 py-2 rounded-lg
              bg-gray-100 cursor-not-allowed text-gray-500"
            />
          </div>

          {/* Recipient Name */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipientName"
              defaultValue={request.recipientName}
              required
              className="w-full border px-4 py-2 rounded-lg
              focus:outline-none focus:border-red-400"
            />
          </div>

          {/* District & Upazila */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* District */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Recipient District
              </label>
              <select
                name="recipientDistrict"
                required
                onChange={handleDistrictChange}
                className="w-full border px-4 py-2 rounded-lg
                focus:outline-none focus:border-red-400"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option
                    key={d.id}
                    value={d.id}
                    //  পুরনো district selected থাকবে
                    selected={d.name === request.recipientDistrict}
                  >
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Recipient Upazila
              </label>
              <select
                name="recipientUpazila"
                required
                className="w-full border px-4 py-2 rounded-lg
                focus:outline-none focus:border-red-400"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((u) => (
                  <option
                    key={u.id}
                    value={u.name}
                    //  পুরনো upazila selected থাকবে
                    selected={u.name === request.recipientUpazila}
                  >
                    {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hospital Name */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Hospital Name
            </label>
            <input
              type="text"
              name="hospitalName"
              defaultValue={request.hospitalName}
              required
              className="w-full border px-4 py-2 rounded-lg
              focus:outline-none focus:border-red-400"
            />
          </div>

          {/* Full Address */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Full Address
            </label>
            <input
              type="text"
              name="fullAddress"
              defaultValue={request.fullAddress}
              required
              className="w-full border px-4 py-2 rounded-lg
              focus:outline-none focus:border-red-400"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              required
              className="w-full border px-4 py-2 rounded-lg
              focus:outline-none focus:border-red-400"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option
                  key={bg}
                  value={bg}
                  //  পুরনো blood group selected থাকবে
                  selected={bg === request.bloodGroup}
                >
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                defaultValue={request.donationDate}
                required
                className="w-full border px-4 py-2 rounded-lg
                focus:outline-none focus:border-red-400"
              />
            </div>

            {/* Time */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Donation Time
              </label>
              <input
                type="time"
                name="donationTime"
                defaultValue={request.donationTime}
                required
                className="w-full border px-4 py-2 rounded-lg
                focus:outline-none focus:border-red-400"
              />
            </div>
          </div>

          {/* Request Message */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Request Message
            </label>
            <textarea
              name="requestMessage"
              rows={4}
              defaultValue={request.requestMessage}
              required
              className="w-full border px-4 py-2 rounded-lg
              focus:outline-none focus:border-red-400 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            {/* Cancel */}
            <button
              type="button"
              onClick={() => navigate("/dashboard/my-donation-requests")}
              className="flex-1 border border-gray-300 text-gray-600
              py-3 rounded-xl font-medium hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>

            {/* Submit */}
            <button
              type="submit"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white
              py-3 rounded-xl font-medium transition-all"
            >
              Update Donation Request 
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDonationRequest;
