// import { useState, useEffect } from "react";
// import useAuth from "../../../hooks/useAuth";
// import axios from "axios";
// import coverImg from "../../../assets/images/cover.jpg";
// import { toast } from "react-hot-toast";
// import { imageUpload } from "../../../utils";
// import useRole from "../../../hooks/useRole";


// const Profile = () => {
//   const { user, setLoading } = useAuth();
//   const [role] = useRole();
//   // const [userData, setUserData] = useState({});
//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     blood_group: "",
//     district: "",
//     upazila: "",
//     image: "",
//   });
//   const [showModal, setShowModal] = useState(false);
//   const [avatarFile, setAvatarFile] = useState(null);

//   // Fetch user data
//   useEffect(() => {
//     if (!user?.email) return; // 🔥 VERY IMPORTANT

//     const fetchUser = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_API_URL}/users`,
//         );

//         const currentUser = data.find((u) => u.email === user.email);

//         if (currentUser) {
//           setUserData(currentUser);
//         }

//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [user?.email, setLoading]);


//   // useEffect(() => {
//   //   const fetchUser = async () => {
//   //     try {
//   //       const { data } = await axios.get(
//   //         `${import.meta.env.VITE_API_URL}/users`,
//   //       );
//   //       const currentUser = data.find((u) => u.email === user?.email);
//   //       setUserData(currentUser);
//   //       setLoading(false);
//   //     } catch (err) {
//   //       console.error(err);
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchUser();
//   // }, [user?.name]);
//   // console.log(userData?.email);
//   // console.log(userData.email)

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => setAvatarFile(e.target.files[0]);

// const handleUpdate = async () => {
//   try {
//     const updatedData = {
//       name: userData.name,
//       blood_group: userData.blood_group,
//       district: userData.district,
//       upazila: userData.upazila,
//     };

//     // Only upload avatar if file selected
//     if (avatarFile) {
//       // const uploadedUrl = await imageUploadCloudinary(avatarFile);
//       const uploadedUrl = await imageUpload(avatarFile);
//       // avatar;
//       updatedData.image  = uploadedUrl;
//     }

//     const res = await axios.patch(
//       `${import.meta.env.VITE_API_URL}/users/${userData.email}`,
//       updatedData
//     );

//     toast.success(res.data.message || "Profile updated successfully!");
//     setUserData((prev) => ({ ...prev, ...updatedData }));
//     setShowModal(false);
//   } catch (err) {
//     console.error(err.response?.data || err.message);
//     toast.error(err.response?.data?.message || "Failed to update profile");
//   }
// };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
//         <img
//           src={coverImg}
//           alt="cover"
//           className="w-full h-56 mb-4 rounded-t-lg object-cover"
//         />
//         <div className="flex flex-col items-center -mt-16 p-4">
//           <div className="relative">
//             <img
//               // src={userData.avatar || userData.image || ""}
//               src={userData?.image || ""}
//               alt="profile"
//               className="h-24 w-24 rounded-full border-2 border-white object-cover"
//             />
//           </div>

//           <p className="p-2 px-4 mt-2 text-xs text-white bg-lime-500 rounded-full">
//             {role}
//           </p>

//           <div className="w-full p-2 mt-4 text-gray-600">
//             <p>
//               <strong>Name:</strong> {userData.name}
//             </p>
//             <p>
//               <strong>Email:</strong> {userData.email}
//             </p>
//             <p>
//               <strong>Blood Group:</strong> {userData.blood_group}
//             </p>
//             <p>
//               <strong>District:</strong> {userData.district}
//             </p>
//             <p>
//               <strong>Upazila:</strong> {userData.upazila}
//             </p>

//             <button
//               onClick={() => setShowModal(true)}
//               className="mt-4 bg-lime-500 px-6 py-1 rounded text-white hover:bg-lime-800"
//             >
//               Update Profile
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg w-96 p-6 relative">
//             <h2 className="text-xl font-bold mb-4">Update Profile</h2>

//             <div className="flex flex-col gap-3">
//               <label>Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={userData.name || ""}
//                 onChange={handleChange}
//                 className="border rounded p-2 w-full"
//               />

//               <label>Blood Group</label>
//               <select
//                 name="blood_group"
//                 value={userData.blood_group || ""}
//                 onChange={handleChange}
//                 className="border rounded p-2 w-full"
//               >
//                 {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
//                   (bg) => (
//                     <option key={bg} value={bg}>
//                       {bg}
//                     </option>
//                   ),
//                 )}
//               </select>

//               <label>District</label>
//               <input
//                 type="text"
//                 name="district"
//                 value={userData.district || ""}
//                 onChange={handleChange}
//                 className="border rounded p-2 w-full"
//               />

//               <label>Upazila</label>
//               <input
//                 type="text"
//                 name="upazila"
//                 value={userData.upazila || ""}
//                 onChange={handleChange}
//                 className="border rounded p-2 w-full"
//               />

//               <label>Avatar</label>
//               <input
//                 type="file"
//                 onChange={handleFileChange}
//                 className="border rounded p-2 w-full"
//               />
//             </div>

//             <div className="flex justify-end gap-2 mt-4">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-400 px-4 py-1 rounded text-white hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 className="bg-lime-500 px-4 py-1 rounded text-white hover:bg-lime-800"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;







// GPT
// import { useState, useEffect } from "react";
// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { toast } from "react-hot-toast";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

// const Profile = () => {
//   const { user, loading } = useAuth();
//   const { role, refetch } = useRole();
//   const axiosSecure = useAxiosSecure();

//   const [userData, setUserData] = useState({});
//   const [userDataLoading, setUserDataLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

//   // ✅ USER LOAD (BEST)
//   useEffect(() => {
//     if (!user?.email) return;

//     const fetchUser = async () => {
//       try {
//         const { data } = await axiosSecure.get(`/users/${user.email}`);
//         setUserData(data || {});
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setUserDataLoading(false);
//       }
//     };

//     fetchUser();
//   }, [user?.email]);

//   // ✅ CHANGE HANDLER
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ UPDATE PROFILE
//   const handleUpdate = async () => {
//     try {
//       const updatedData = {
//         name: userData.name,
//         blood_group: userData.blood_group,
//         district: userData.district,
//         upazila: userData.upazila,
//       };

//       await axiosSecure.patch(`/users/update/${userData.email}`, updatedData);

//       toast.success("Profile updated!");

//       setUserData((prev) => ({ ...prev, ...updatedData }));
//       setIsEditing(false);

//       // 🔥 VERY IMPORTANT
//       await refetch();
//     } catch (err) {
//       console.error(err);
//       toast.error("Update failed");
//     }
//   };

//   if (loading || userDataLoading) return <LoadingSpinner />;
//   if (!user) return null;

//   const avatar =
//     userData?.image ||
//     user?.photoURL ||
//     "https://cdn-icons-png.flaticon.com/512/149/149071.png";

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex justify-center items-center">
//       <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
//         <div className="flex flex-col items-center">
//           <img
//             src={avatar}
//             alt="profile"
//             className="h-24 w-24 rounded-full object-cover border"
//           />

//           <h2 className="mt-2 text-xl font-semibold">{userData.name}</h2>

//           <span className="text-sm text-white bg-red-500 px-3 py-1 rounded mt-1">
//             {role}
//           </span>
//         </div>

//         <div className="mt-4 space-y-3">
//           <input
//             type="text"
//             name="name"
//             value={userData.name || ""}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full border p-2 rounded"
//           />

//           <input
//             type="email"
//             value={userData.email || ""}
//             readOnly
//             className="w-full border p-2 rounded bg-gray-100"
//           />

//           <input
//             type="text"
//             name="blood_group"
//             value={userData.blood_group || ""}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full border p-2 rounded"
//           />

//           <input
//             type="text"
//             name="district"
//             value={userData.district || ""}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full border p-2 rounded"
//           />

//           <input
//             type="text"
//             name="upazila"
//             value={userData.upazila || ""}
//             onChange={handleChange}
//             readOnly={!isEditing}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div className="mt-4 flex justify-end gap-2">
//           {!isEditing ? (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="bg-blue-500 text-white px-4 py-1 rounded"
//             >
//               Edit
//             </button>
//           ) : (
//             <>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 className="bg-gray-400 text-white px-4 py-1 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleUpdate}
//                 className="bg-green-500 text-white px-4 py-1 rounded"
//               >
//                 Save
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// GPT COD XXX


// cloud 1 ASOLLLLL

import { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role] = useRole();
  const axiosSecure = useAxiosSecure();

  const [userData, setUserData] = useState({});
  const [userDataLoading, setUserDataLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // ✅ Districts লোড
  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  // ✅ User data লোড
  useEffect(() => {
    if (!user?.email) return;
    const fetchUser = async () => {
      try {
        const { data } = await axiosSecure.get("/users");
        const currentUser = data.find((u) => u.email === user.email);
        setUserData(currentUser || {});
      } catch (err) {
        console.error(err);
      } finally {
        setUserDataLoading(false); // ✅ লোড শেষ
      }
    };
    fetchUser();
  }, [user?.email]);

  // ✅ District পরিবর্তন
  const handleDistrictChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const found = districts.find((d) => d.id === selectedId);
    setUpazilas(found ? found.upazilas : []);
    setUserData((prev) => ({
      ...prev,
      district: found?.name || "",
      upazila: "",
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Profile Update
  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: userData.name,
        blood_group: userData.blood_group, // ✅
        district: userData.district,
        upazila: userData.upazila,
      };

      await axiosSecure.patch(`/users/update/${userData.email}`, updatedData);

      toast.success("Profile updated successfully!");
      setUserData((prev) => ({ ...prev, ...updatedData }));
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  // ✅ লোড হওয়ার আগে spinner
  if (loading || userDataLoading) return <LoadingSpinner />;
  if (!user) return null;

  // ✅ সঠিক field নাম
  const avatar =
    userData?.image || // ← MongoDB "image"
    user?.photoURL ||
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      <div
        className="max-w-2xl mx-auto bg-white rounded-2xl
      shadow-md overflow-hidden"
      >
        {/* Cover */}
        <div className="h-32 bg-gradient-to-r from-red-500 to-red-700" />

        {/* Avatar + Role */}
        <div className="flex flex-col items-center -mt-12 px-6 pb-6">
          {/* ✅ Image - একটাই দেখাবে */}
          <img
            src={avatar}
            alt="profile"
            className="h-24 w-24 rounded-full border-4 border-white
            object-cover shadow-md"
          />

          <span
            className="mt-2 px-4 py-1 text-xs text-white
          bg-red-500 rounded-full capitalize"
          >
            {role}
          </span>

          {/* Edit / Save */}
          <div className="w-full flex justify-end mt-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-600 hover:bg-red-700 text-white
                px-5 py-2 rounded-lg text-sm font-medium"
              >
                ✏️ Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 text-gray-600
                  px-5 py-2 rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-red-600 hover:bg-red-700 text-white
                  px-5 py-2 rounded-lg text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Form */}
          <div className="w-full mt-4 space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={userData.name || ""}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border px-4 py-2 rounded-lg text-sm
                  ${
                    isEditing
                      ? "focus:outline-none focus:border-red-400"
                      : "bg-gray-50 cursor-not-allowed text-gray-500"
                  }`}
              />
            </div>

            {/* Email - Read Only */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">Email</label>
              <input
                type="email"
                value={userData.email || ""}
                readOnly
                className="w-full border px-4 py-2 rounded-lg text-sm
                bg-gray-50 cursor-not-allowed text-gray-500"
              />
            </div>

            {/* ✅ Blood Group */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Blood Group
              </label>
              {isEditing ? (
                <select
                  name="blood_group" // ✅
                  value={userData.blood_group || ""}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg text-sm
                  focus:outline-none focus:border-red-400"
                >
                  <option value="">Select</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (bg) => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ),
                  )}
                </select>
              ) : (
                <input
                  type="text"
                  value={userData.blood_group || ""} // ✅
                  readOnly
                  className="w-full border px-4 py-2 rounded-lg text-sm
                  bg-gray-50 cursor-not-allowed text-gray-500"
                />
              )}
            </div>

            {/* District */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">
                District
              </label>
              {isEditing ? (
                <select
                  onChange={handleDistrictChange}
                  className="w-full border px-4 py-2 rounded-lg text-sm
                  focus:outline-none focus:border-red-400"
                >
                  <option value="">
                    {userData.district || "Select District"}
                  </option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={userData.district || ""}
                  readOnly
                  className="w-full border px-4 py-2 rounded-lg text-sm
                  bg-gray-50 cursor-not-allowed text-gray-500"
                />
              )}
            </div>

            {/* Upazila */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Upazila
              </label>
              {isEditing ? (
                <select
                  name="upazila"
                  value={userData.upazila || ""}
                  onChange={handleChange}
                  className="w-full border px-4 py-2 rounded-lg text-sm
                  focus:outline-none focus:border-red-400"
                >
                  <option value="">
                    {userData.upazila || "Select Upazila"}
                  </option>
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={userData.upazila || ""}
                  readOnly
                  className="w-full border px-4 py-2 rounded-lg text-sm
                  bg-gray-50 cursor-not-allowed text-gray-500"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;


// cloud 2 mane
// import { useState, useEffect } from "react";
// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { toast } from "react-hot-toast";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";

// const Profile = () => {
//   const { user, loading } = useAuth();
//   const [role] = useRole();
//   const axiosSecure = useAxiosSecure();

//   const [userData, setUserData] = useState({});
//   const [isEditing, setIsEditing] = useState(false);
//   const [districts, setDistricts] = useState([]);
//   const [upazilas, setUpazilas] = useState([]);

//   // ✅ Districts লোড
//   useEffect(() => {
//     fetch("/Districts.json")
//       .then((res) => res.json())
//       .then((data) => setDistricts(data));
//   }, []);

//   // ✅ User data লোড
//   useEffect(() => {
//     if (!user?.email) return;
//     const fetchUser = async () => {
//       try {
//         const { data } = await axiosSecure.get("/users");
//         const currentUser = data.find((u) => u.email === user.email);
//         setUserData(currentUser || {});
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchUser();
//   }, [user?.email]);

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

//   const handleUpdate = async () => {
//     try {
//       const bloodGroup = userData.bloodGroup || userData.blood_group || "";

//       const updatedData = {
//         name: userData.name,
//         bloodGroup: bloodGroup, // ✅ camelCase
//         blood_group: bloodGroup, // ✅ underscore ও save
//         district: userData.district,
//         upazila: userData.upazila,
//       };

//       await axiosSecure.patch(`/users/update/${userData.email}`, updatedData);

//       toast.success("Profile updated successfully!");
//       setUserData((prev) => ({ ...prev, ...updatedData }));
//       setIsEditing(false);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update profile");
//     }
//   };

//   if (loading) return <LoadingSpinner />;
//   if (!user) return null;

//   // ✅ Blood Group দুটো field থেকে নেবে
//   const bloodGroup = userData?.bloodGroup || userData?.blood_group || "";

//   // ✅ Image দুটো field থেকে নেবে
//   const avatar =
//     userData?.avatar ||
//     userData?.image ||
//     `https://i.pravatar.cc/100?u=${user?.email}`;

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
//           {/* ✅ Image */}
//           <img
//             src={avatar}
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

//           {/* Edit / Save */}
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
//                   onClick={() => setIsEditing(false)}
//                   className="border border-gray-300 text-gray-600
//                   px-5 py-2 rounded-lg text-sm"
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

//           {/* Form */}
//           <div className="w-full mt-4 space-y-4">
//             {/* Name */}
//             <div>
//               <label className="text-sm text-gray-500 block mb-1">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={userData.name || ""}
//                 onChange={handleChange}
//                 readOnly={!isEditing}
//                 className={`w-full border px-4 py-2 rounded-lg text-sm
//                   ${
//                     isEditing
//                       ? "focus:outline-none focus:border-red-400"
//                       : "bg-gray-50 cursor-not-allowed text-gray-500"
//                   }`}
//               />
//             </div>

//             {/* Email - Read Only */}
//             <div>
//               <label className="text-sm text-gray-500 block mb-1">Email</label>
//               <input
//                 type="email"
//                 value={userData.email || ""}
//                 readOnly
//                 className="w-full border px-4 py-2 rounded-lg text-sm
//                 bg-gray-50 cursor-not-allowed text-gray-500"
//               />
//             </div>

//             {/* ✅ Blood Group */}
//             <div>
//               <label className="text-sm text-gray-500 block mb-1">
//                 Blood Group
//               </label>
//               {isEditing ? (
//                 <select
//                   name="bloodGroup"
//                   value={bloodGroup}
//                   onChange={handleChange}
//                   className="w-full border px-4 py-2 rounded-lg text-sm
//                   focus:outline-none focus:border-red-400"
//                 >
//                   <option value="">Select</option>
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
//                   value={bloodGroup} // ✅ এখন দেখাবে
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
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
// 

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