import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const mode = location.state?.mode || "view"; 

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Fetch single donation request
  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests/${id}`
        );
        setRequest(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load donation request");
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  //  Donate Confirm
  const handleDonateConfirm = async () => {
    try {
      const token = await user.getIdToken();
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}/donation-requests/${id}/donate`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setRequest((prev) => ({
          ...prev,
          status: "inprogress",
          donorName: user?.displayName,
          donorEmail: user?.email,
        }));
        setOpen(false);
        toast.success("Donation request accepted!");
        navigate(-1);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  //  Update request (edit mode)
 const handleUpdate = async () => {
  setUpdating(true);
  try {
    const { _id, ...updateData } = request; 

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/donation-requests/${id}`,
      updateData
    );

    toast.success("Donation request updated successfully!");
    navigate(-1);
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || "Update failed!");
  } finally {
    setUpdating(false);
  }
};


  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!request) return <p className="text-center mt-20">Request not found</p>;

  return (
    <div className="min-h-screen bg-red-50 px-4 py-12 flex justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-red-700 mb-6">
          {mode === "edit" ? "Edit Donation Request" : "Donation Request Details"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-gray-800">
          {/* Requester Name */}
          <Field
            label="Requester Name"
            value={request.requesterName}
            editable={mode === "edit"}
            onChange={(val) => setRequest((prev) => ({ ...prev, requesterName: val }))}
          />

          {/* Blood Group */}
          <Field
            label="Blood Group"
            value={request.bloodGroup}
            editable={mode === "edit"}
            onChange={(val) => setRequest((prev) => ({ ...prev, bloodGroup: val }))}
          />

          {/* Hospital Name */}
          <Field
            label="Hospital"
            value={request.hospitalName}
            editable={mode === "edit"}
            onChange={(val) => setRequest((prev) => ({ ...prev, hospitalName: val }))}
          />

          {/* District */}
          <Field label="District" value={request.recipientDistrict} editable={false} />

          {/* Upazila */}
          <Field label="Upazila" value={request?.recipientUpazila} editable={false} />

          {/* Donation Date */}
          <Field
            label="Donation Date"
            value={request.donationDate}
            editable={mode === "edit"}
            type="date"
            onChange={(val) => setRequest((prev) => ({ ...prev, donationDate: val }))}
          />

          {/* Donation Time */}
          <Field
            label="Donation Time"
            value={request.donationTime}
            editable={mode === "edit"}
            type="time"
            onChange={(val) => setRequest((prev) => ({ ...prev, donationTime: val }))}
          />

          {/* Full Address */}
          <Field
            label="Full Address"
            value={request.fullAddress}
            editable={mode === "edit"}
            textarea
            onChange={(val) => setRequest((prev) => ({ ...prev, fullAddress: val }))}
            fullWidth
          />

          {/* Message */}
          <Field
            label="Message"
            value={request.requestMessage}
            editable={mode === "edit"}
            textarea
            onChange={(val) => setRequest((prev) => ({ ...prev, requestMessage: val }))}
            fullWidth
          />

          {/* Status */}
          {mode === "edit" && (
            <div className={mode === "edit" ? "md:col-span-2" : ""}>
              <p className="font-semibold text-gray-700 mb-1">Status</p>
              <select
                value={request.status}
                onChange={(e) =>
                  setRequest((prev) => ({ ...prev, status: e.target.value }))
                }
                className="select select-bordered w-full"
              >
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
          )}

          {/* Donor Info */}
          {request.status === "inprogress" && (
            <div className="md:col-span-2 bg-green-50 p-4 rounded-xl">
              <p className="font-semibold text-green-700 mb-1">Donor Information</p>
              <p>Name: {request.donorName || user?.displayName}</p>
              <p>Email: {request.donorEmail || user?.email}</p>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="text-center mt-10 flex flex-col md:flex-row justify-center gap-4">
          {/* Donate button */}
          {request.status === "pending" && user && mode === "view" && (
            <button
              onClick={() => setOpen(true)}
              className="bg-red-600 hover:bg-red-700 transition text-white px-10 py-3 rounded-full font-semibold"
            >
              Donate Now
            </button>
          )}

          {/* Update button */}
          {mode === "edit" && (
            <button
              onClick={handleUpdate}
              className={`bg-red-600 hover:bg-red-700 text-white px-10 py-3 rounded-full font-semibold ${
                updating ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={updating}
            >
              {updating ? "Updating..." : "Update Request"}
            </button>
          )}

          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 px-10 py-3 rounded-full font-semibold"
          >
            Back
          </button>
        </div>
      </div>

      {/* CONFIRM MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
          <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-red-700 mb-6 text-center">
              Confirm Donation
            </h2>

            <div className="space-y-4">
              <Input label="Donor Name" value={user?.displayName} />
              <Input label="Donor Email" value={user?.email} />

              <button
                onClick={handleDonateConfirm}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold"
              >
                Confirm & Proceed
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-full text-gray-600 mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* 🔹 Reusable Components */

const Field = ({ label, value, editable, onChange, textarea, type, fullWidth }) => {
  return (
    <div className={fullWidth ? "md:col-span-2" : ""}>
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {editable ? (
        textarea ? (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />
        ) : (
          <input
            type={type || "text"}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          />
        )
      ) : (
        <p className="bg-gray-100 p-3 rounded-xl mt-1">{value}</p>
      )}
    </div>
  );
};

const Input = ({ label, value }) => (
  <div>
    <p className="font-semibold text-gray-700 mb-1">{label}</p>
    <input
      readOnly
      value={value || ""}
      className="w-full border rounded-xl px-4 py-3 bg-gray-100"
    />
  </div>
);

export default DonationRequestDetails;
