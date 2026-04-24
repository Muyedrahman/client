import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingSpinner";
import { useEffect, useState } from "react";
// import { useLoaderData } from "react-router";

const AddPlantForm = () => {
  // const data = useLoaderData();
  const [data,setData]=useState([])
  useEffect(()=>{
    axios.get('/Districts.json').then(res =>setData(res.data)).catch(err=>console.log(err))
  },[])
  console.log(data) 

  const [userStatus, setUserStatus] = useState("");
  const { user, loading } = useAuth();

  const { register, handleSubmit, control, reset, watch, setValue } = useForm({
    defaultValues: {
      district: "",
      recipient_upazila: "",
    },
  });

  const selectedDistrict = watch("district");
  const filteredUpazilas =
    data.find((d) => d.name === selectedDistrict)?.upazilas || [];


  // Check user status
  useEffect(() => {
    const getUserStatus = async () => {
      try {
        const { data: usersData } = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );
        const currentUser = usersData.find((u) => u.email === user?.email);
        if (currentUser) setUserStatus(currentUser.status);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.email) getUserStatus();
  }, [user]);

  const donationMutation = useMutation({
    mutationFn: async (donationRequest) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/donation-requests`,
        donationRequest
      );
      return response.data;
    },
  });

  const onSubmit = async (formData) => {
    if (userStatus === "blocked") {
      toast.error("You are blocked. You cannot create donation request.");
      return;
    }

    const donationRequest = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientUpazila: formData.recipient_upazila,
      district: formData.district,
      hospitalName: formData.hospital_name,
      fullAddress: formData.full_address,
      bloodGroup: formData.blood_group,
      donationDate: formData.donation_date,
      donationTime: formData.donation_time,
      requestMessage: formData.request_message,
    };

    try {
      const result = await donationMutation.mutateAsync(donationRequest);
      if (result.success) {
        toast.success("Donation Request Created");
        reset();
      }
    } catch (error) {
      toast.error("Failed to create donation request");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-r from-red-50 to-red-100 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-700">
          Create Donation Request
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Requester Name */}
          <div className="col-span-2">
            <label className="font-semibold text-gray-700">Requester Name</label>
            <input
              readOnly
              value={user?.displayName || ""}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1 bg-gray-100"
            />
          </div>

          {/* Requester Email */}
          <div className="col-span-2">
            <label className="font-semibold text-gray-700">Requester Email</label>
            <input
              readOnly
              value={user?.email || ""}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1 bg-gray-100"
            />
          </div>

          {/* District */}
          <div>
            <label className="font-semibold text-gray-700">District</label>
            <Controller
              control={control}
              name="district"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    // reset upazila when district changes
                    setValue("recipient_upazila", "");
                  }}
                  className="w-full border border-gray-300 rounded-xl p-3 mt-1"
                >
                  <option value="">Select District</option>
                  {data.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Recipient Upazila */}
          <div>
            <label className="font-semibold text-gray-700">Recipient Upazila</label>
            <Controller
              control={control}
              name="recipient_upazila"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-300 rounded-xl p-3 mt-1"
                  disabled={!selectedDistrict}
                >
                  <option value="">Select Upazila</option>
                  {filteredUpazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Hospital Name */}
          <div>
            <label className="font-semibold text-gray-700">Hospital Name</label>
            <input
              {...register("hospital_name", { required: true })}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1"
              placeholder="Hospital Name"
            />
          </div>

          {/* Full Address */}
          <div className="col-span-2">
            <label className="font-semibold text-gray-700">Full Address</label>
            <textarea
              {...register("full_address", { required: true })}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1"
              placeholder="Full address"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="font-semibold text-gray-700">Blood Group</label>
            <select
              {...register("blood_group", { required: true })}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1"
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>O+</option>
              <option>O-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>

          {/* Donation Date */}
          <div>
            <label className="font-semibold text-gray-700">Donation Date</label>
            <input
              type="date"
              {...register("donation_date", { required: true })}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1"
            />
          </div>

          {/* Donation Time */}
          <div>
            <label className="font-semibold text-gray-700">Donation Time</label>
            <input
              type="time"
              {...register("donation_time", { required: true })}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1"
            />
          </div>

          {/* Request Message */}
          <div className="col-span-2">
            <label className="font-semibold text-gray-700">Request Message</label>
            <textarea
              {...register("request_message", { required: true })}
              className="w-full border border-gray-300 rounded-xl p-3 mt-1"
              placeholder="Why do you need blood?"
            />
          </div>

          {/* Submit */}
          <div className="col-span-2">
            <button
              type="submit"
              disabled={userStatus === "blocked"}
              className={`w-full font-bold py-3 rounded-xl transition ${
                userStatus === "blocked"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlantForm;
