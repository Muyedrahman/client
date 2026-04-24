import { FaUsers, FaHandHoldingHeart, FaTint } from "react-icons/fa";
import useRole from "../../../hooks/useRole";

const AdminDashboard = () => {
  const [role ]=useRole()
  // Static data
  const stats = {
    userName: "Admin",
    totalUsers: 1200,
    totalFunding: 50000,
    totalRequests: 320,
  };

  return (
    <div className="p-6">
      {/* Welcome */}
      <h2 className="text-2xl font-bold mb-6">
        Welcome, <span className="text-lime-600">
          {
            role === 'admin' && "Admin"
          }
          {
            role === 'volunteer' && "Volunteer"
          }
        </span>
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <FaUsers className="text-4xl text-blue-500" />
          <div>
            <p className="text-gray-500">Total Users</p>
            <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <FaHandHoldingHeart className="text-4xl text-green-500" />
          <div>
            <p className="text-gray-500">Total Funding</p>
            <h3 className="text-2xl font-bold">${stats.totalFunding}</h3>
          </div>
        </div>

        {/* Total Requests */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <FaTint className="text-4xl text-red-500" />
          <div>
            <p className="text-gray-500">Blood Requests</p>
            <h3 className="text-2xl font-bold">{stats.totalRequests}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
