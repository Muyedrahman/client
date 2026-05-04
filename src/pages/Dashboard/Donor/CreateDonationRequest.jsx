import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // JSON 
  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  // District select ---> upazilas  
  const handleDistrictChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const found = districts.find((d) => d.id === selectedId);
    setUpazilas(found ? found.upazilas : []);
  };

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const requestData = {
      requesterName: form.requesterName.value,
      requesterEmail: form.requesterEmail.value,
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
      status: "pending",
    };

    try {
      const { data } = await axiosSecure.post(
        "/donation-requests",
        requestData,
      );

      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Created!",
          text: "Your donation request has been submitted.",
          confirmButtonColor: "#c0392b",
        });
        navigate("/dashboard/my-donation-requests");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Something went wrong. Try again.",
        confirmButtonColor: "#c0392b",
      });
    }
  };

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-medium text-red-700 mb-6 text-center">
          Create Donation Request 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Requester Name - Read Only */}
          <div>
            <label className="text-sm text-gray-600 mb-1 block">
              Requester Name
            </label>
            <input
              type="text"
              name="requesterName"
              defaultValue={user?.displayName}
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
              name="requesterEmail"
              defaultValue={user?.email}
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
              placeholder="Enter recipient name"
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
                  <option key={d.id} value={d.id}>
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
                  <option key={u.id} value={u.name}>
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
              placeholder="e.g. Dhaka Medical College Hospital"
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
              placeholder="e.g. Zahir Raihan Rd, Dhaka"
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
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Donation Date
              </label>
              <input
                type="date"
                name="donationDate"
                required
                className="w-full border px-4 py-2 rounded-lg 
                focus:outline-none focus:border-red-400"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Donation Time
              </label>
              <input
                type="time"
                name="donationTime"
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
              placeholder="Why do you need blood? Explain in detail..."
              required
              className="w-full border px-4 py-2 rounded-lg 
              focus:outline-none focus:border-red-400 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white 
            py-3 rounded-xl font-medium transition-all"
          >
            Request Blood Donation  
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;
