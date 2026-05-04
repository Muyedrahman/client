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

  //  Districts ->>lod
  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));
  }, []);

  //   User data -->lodd
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
        setUserDataLoading(false);  
      }
    };
    fetchUser();
  }, [user?.email]);

  //   District priborton
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

  //   Profile Update
  const handleUpdate = async () => {
    try {
      const updatedData = {
        name: userData.name,
        blood_group: userData.blood_group,  
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

  //   spinner
  if (loading || userDataLoading) return <LoadingSpinner />;
  if (!user) return null;

  //  
  const avatar =
    userData?.image ||  
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
                 Edit Profile
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

            {/*  Blood Group */}
            <div>
              <label className="text-sm text-gray-500 block mb-1">
                Blood Group
              </label>
              {isEditing ? (
                <select
                  name="blood_group"  
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
                  value={userData.blood_group || ""}  
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

 