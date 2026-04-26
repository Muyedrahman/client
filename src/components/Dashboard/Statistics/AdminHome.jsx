import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //  Statistics data
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/statistics");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-gray-800">
          Welcome, {user?.displayName}! 👑
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage everything from here
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Total Donors */}
        <div
          className="bg-red-50 border border-red-100 
        rounded-xl p-5 flex items-center gap-4"
        >
          <div className="bg-red-100 p-3 rounded-full text-2xl">👤</div>
          <div>
            <p className="text-3xl font-medium text-gray-800">
              {stats.totalUsers || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Donors</p>
          </div>
        </div>

        {/* Total Funding */}
        <div
          className="bg-green-50 border border-green-100 
        rounded-xl p-5 flex items-center gap-4"
        >
          <div className="bg-green-100 p-3 rounded-full text-2xl">💰</div>
          <div>
            <p className="text-3xl font-medium text-gray-800">
              ${stats.totalFunding || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Funding</p>
          </div>
        </div>

        {/* Total Requests */}
        <div
          className="bg-blue-50 border border-blue-100 
        rounded-xl p-5 flex items-center gap-4"
        >
          <div className="bg-blue-100 p-3 rounded-full text-2xl">🩸</div>
          <div>
            <p className="text-3xl font-medium text-gray-800">
              {stats.totalRequests || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Total Donation Requests
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
