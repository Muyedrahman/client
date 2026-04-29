import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import axios from "axios";

import coverImg from "../../../assets/images/cover.jpg";
import { toast } from "react-hot-toast";
import { imageUpload } from "../../../utils";

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
      // const uploadedUrl = await imageUploadCloudinary(avatarFile);
      const uploadedUrl = await imageUpload(avatarFile);
      // avatar;
      updatedData.image  = uploadedUrl;
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
              // src={userData.avatar || userData.image || ""}
              src={userData?.image || ""}
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
                  ),
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


// 2222222222222222222
// import { useState, useEffect } from "react";
// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { toast } from "react-hot-toast";
// import { imageUpload } from "../../../utils";

// const Profile = () => {
//   const { user } = useAuth();
//   const [role] = useRole();
//   const axiosSecure = useAxiosSecure();

//   const [userData, setUserData] = useState({});
//   const [isEditing, setIsEditing] = useState(false); // ✅ Edit mode
//   const [avatarFile, setAvatarFile] = useState(null);
//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);

//   // ✅ Districts লোড
//   useEffect(() => {
//     fetch("/Districts.json")
//       .then((res) => res.json())
//       .then((data) => setDistricts(data));
//   }, []);

//   // ✅ User data লোড - নিজের email দিয়ে
//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const { data } = await axiosSecure.get(`/users?email=${user?.email}`);
//         // ✅ নিজের data খুঁজে নেয়
//         const currentUser = Array.isArray(data)
//           ? data.find((u) => u.email === user?.email)
//           : data;
//         setUserData(currentUser || {});
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     if (user?.email) fetchUser();
//   }, [user?.email]);

//   // ✅ District পরিবর্তন হলে Upazila লোড
//   const handleDistrictChange = (e) => {
//     const selectedId = parseInt(e.target.value);
//     const found = districts.find((d) => d.id === selectedId);
//     setUpazilas(found ? found.upazilas : []);
//     setUserData((prev) => ({
//       ...prev,
//       district: found?.name || "",
//       upazila: "",
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     setAvatarFile(e.target.files[0]);
//   };

//   // ✅ Profile Update
//   const handleUpdate = async () => {
//     try {
//       const updatedData = {
//         name: userData.name,
//         bloodGroup: userData.bloodGroup,
//         district: userData.district,
//         upazila: userData.upazila,
//       };

//       // ✅ Avatar upload হলে ImageBB তে পাঠাবে
//       if (avatarFile) {
//         const uploadedUrl = await imageUpload(avatarFile);
//         updatedData.avatar = uploadedUrl; // ✅ image না avatar
//       }

//       // ✅ সঠিক API endpoint
//       await axiosSecure.patch(`/users/update/${userData.email}`, updatedData);

//       toast.success("Profile updated successfully!");
//       setUserData((prev) => ({ ...prev, ...updatedData }));
//       setIsEditing(false); // ✅ Edit mode বন্ধ
//       setAvatarFile(null);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update profile");
//     }
//   };

//   return (
//     <div className="p-6 bg-red-50 min-h-screen">
//       <div
//         className="max-w-2xl mx-auto bg-white rounded-2xl 
//       shadow-md overflow-hidden"
//       >
//         {/* Cover */}
//         <div className="h-32 bg-gradient-to-r from-red-500 to-red-700" />

//         {/* Avatar + Role */}
//         <div className="flex flex-col items-center -mt-12 px-6 pb-6">
//           <img
//             src={userData?.avatar || "https://ibb.co.com/s9N6xTyj"}
//             alt="profile"
//             className="h-24 w-24 rounded-full border-4 border-white 
//             object-cover shadow-md"
//           />
//           <span
//             className="mt-2 px-4 py-1 text-xs text-white 
//           bg-red-500 rounded-full capitalize"
//           >
//             {role}
//           </span>

//           {/* ✅ Edit বাটন - উপরে ডানে */}
//           <div className="w-full flex justify-end mt-4">
//             {!isEditing ? (
//               <button
//                 onClick={() => setIsEditing(true)}
//                 className="bg-red-600 hover:bg-red-700 text-white 
//                 px-5 py-2 rounded-lg text-sm font-medium"
//               >
//                 ✏️ Edit Profile
//               </button>
//             ) : (
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => {
//                     setIsEditing(false);
//                     setAvatarFile(null);
//                   }}
//                   className="border border-gray-300 text-gray-600 
//                   px-5 py-2 rounded-lg text-sm hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdate}
//                   className="bg-red-600 hover:bg-red-700 text-white 
//                   px-5 py-2 rounded-lg text-sm font-medium"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* ✅ Profile Form */}
//           <div className="w-full mt-4 space-y-4">
//             {/* Name */}
//             <div>
//               <label className="text-sm text-gray-500 block mb-1">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={userData.name || ""}
//                 onChange={handleChange}
//                 readOnly={!isEditing} // ✅ Edit mode এ editable
//                 className={`w-full border px-4 py-2 rounded-lg text-sm
//                   ${
//                     isEditing
//                       ? "focus:outline-none focus:border-red-400"
//                       : "bg-gray-50 cursor-not-allowed text-gray-500"
//                   }`}
//               />
//             </div>

//             {/* Email - সবসময় Read Only */}
//             <div>
//               <label className="text-sm text-gray-500 block mb-1">Email</label>
//               <input
//                 type="email"
//                 value={userData.email || ""}
//                 readOnly // ✅ Email কখনো editable না
//                 className="w-full border px-4 py-2 rounded-lg text-sm
//                 bg-gray-50 cursor-not-allowed text-gray-500"
//               />
//             </div>

//             {/* Blood Group */}
//             <div>
//               <label className="text-sm text-gray-500 block mb-1">
//                 Blood Group
//               </label>
//               {isEditing ? (
//                 <select
//                   name="bloodGroup"
//                   value={userData.bloodGroup || ""}
//                   onChange={handleChange}
//                   className="w-full border px-4 py-2 rounded-lg text-sm
//                   focus:outline-none focus:border-red-400"
//                 >
//                   <option value="">Select Blood Group</option>
//                   {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                     (bg) => (
//                       <option key={bg} value={bg}>
//                         {bg}
//                       </option>
//                     ),
//                   )}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   value={userData.bloodGroup || ""}
//                   readOnly
//                   className="w-full border px-4 py-2 rounded-lg text-sm
//                   bg-gray-50 cursor-not-allowed text-gray-500"
//                 />
//               )}
//             </div>

//             {/* District */}
//             <div>
//               <label className="text-sm text-gray-500 block mb-1">
//                 District
//               </label>
//               {isEditing ? (
//                 <select
//                   name="district"
//                   onChange={handleDistrictChange}
//                   className="w-full border px-4 py-2 rounded-lg text-sm
//                   focus:outline-none focus:border-red-400"
//                 >
//                   <option value="">
//                     {userData.district || "Select District"}
//                   </option>
//                   {districts.map((d) => (
//                     <option key={d.id} value={d.id}>
//                       {d.name}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   value={userData.district || ""}
//                   readOnly
//                   className="w-full border px-4 py-2 rounded-lg text-sm
//                   bg-gray-50 cursor-not-allowed text-gray-500"
//                 />
//               )}
//             </div>

//             {/* Upazila */}
//             <div>
//               <label className="text-sm text-gray-500 block mb-1">
//                 Upazila
//               </label>
//               {isEditing ? (
//                 <select
//                   name="upazila"
//                   value={userData.upazila || ""}
//                   onChange={handleChange}
//                   className="w-full border px-4 py-2 rounded-lg text-sm
//                   focus:outline-none focus:border-red-400"
//                 >
//                   <option value="">
//                     {userData.upazila || "Select Upazila"}
//                   </option>
//                   {upazilas.map((u) => (
//                     <option key={u.id} value={u.name}>
//                       {u.name}
//                     </option>
//                   ))}
//                 </select>
//               ) : (
//                 <input
//                   type="text"
//                   value={userData.upazila || ""}
//                   readOnly
//                   className="w-full border px-4 py-2 rounded-lg text-sm
//                   bg-gray-50 cursor-not-allowed text-gray-500"
//                 />
//               )}
//             </div>

//             {/* ✅ Avatar Upload - শুধু Edit mode এ */}
//             {isEditing && (
//               <div>
//                 <label className="text-sm text-gray-500 block mb-1">
//                   Avatar
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   className="w-full border px-4 py-2 rounded-lg text-sm"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;