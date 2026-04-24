import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import axios from "axios";

import coverImg from "../../../assets/images/cover.jpg";
import { toast } from "react-hot-toast";
import { imageUploadCloudinary } from "../../../utils";

const Profile = () => {
  const { user, setLoading } = useAuth();
  const [role] = useRole();
  const [userData, setUserData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/users`
        );
        const currentUser = data.find((u) => u.email === user?.email);
        setUserData(currentUser);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchUser();
  }, [user?.email]);
  console.log(userData.email)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => setAvatarFile(e.target.files[0]);

const handleUpdate = async () => {
  try {
    const updatedData = {
      name: userData.name,
      blood_group: userData.blood_group,
      district: userData.district,
      upazila: userData.upazila,
    };

    // Only upload avatar if file selected
    if (avatarFile) {
      const uploadedUrl = await imageUploadCloudinary(avatarFile);
      updatedData.avatar = uploadedUrl;
    }

    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/${userData.email}`,
      updatedData
    );

    toast.success(res.data.message || "Profile updated successfully!");
    setUserData((prev) => ({ ...prev, ...updatedData }));
    setShowModal(false);
  } catch (err) {
    console.error(err.response?.data || err.message);
    toast.error(err.response?.data?.message || "Failed to update profile");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          src={coverImg}
          alt="cover"
          className="w-full h-56 mb-4 rounded-t-lg object-cover"
        />
        <div className="flex flex-col items-center -mt-16 p-4">
          <div className="relative">
            <img
              src={userData.avatar || userData.image || ""}
              alt="profile"
              className="h-24 w-24 rounded-full border-2 border-white object-cover"
            />
          </div>

          <p className="p-2 px-4 mt-2 text-xs text-white bg-lime-500 rounded-full">
            {role}
          </p>

          <div className="w-full p-2 mt-4 text-gray-600">
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Blood Group:</strong> {userData.blood_group}
            </p>
            <p>
              <strong>District:</strong> {userData.district}
            </p>
            <p>
              <strong>Upazila:</strong> {userData.upazila}
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-4 bg-lime-500 px-6 py-1 rounded text-white hover:bg-lime-800"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 relative">
            <h2 className="text-xl font-bold mb-4">Update Profile</h2>

            <div className="flex flex-col gap-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={userData.name || ""}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />

              <label>Blood Group</label>
              <select
                name="blood_group"
                value={userData.blood_group || ""}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  )
                )}
              </select>

              <label>District</label>
              <input
                type="text"
                name="district"
                value={userData.district || ""}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />

              <label>Upazila</label>
              <input
                type="text"
                name="upazila"
                value={userData.upazila || ""}
                onChange={handleChange}
                className="border rounded p-2 w-full"
              />

              <label>Avatar</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="border rounded p-2 w-full"
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-400 px-4 py-1 rounded text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-lime-500 px-4 py-1 rounded text-white hover:bg-lime-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
