import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const DonorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //  নিজের সর্বশেষ ৩টা request
  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["my-recent-requests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests/my?email=${user?.email}&limit=3`,
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-gray-800">
          Welcome back, {user?.displayName}!
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your blood donation requests
        </p>
      </div>

      {/* Recent Requests */}
      {requests.length > 0 && (
        <div>
          <h3 className="text-base font-medium text-gray-700 mb-3">
            Recent Donation Requests
          </h3>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full text-sm">
              <thead className="bg-red-600 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">Recipient</th>
                  <th className="px-4 py-3 text-left">Location</th>
                  <th className="px-4 py-3 text-left">Blood</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req, idx) => (
                  <tr
                    key={req._id}
                    className={idx % 2 === 0 ? "bg-white" : "bg-red-50"}
                  >
                    <td className="px-4 py-3">{req.recipientName}</td>
                    <td className="px-4 py-3">
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    <td className="px-4 py-3 font-medium text-red-600">
                      {req.bloodGroup}
                    </td>
                    <td className="px-4 py-3">{req.donationDate}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={req.status} />
                    </td>
                    <td className="px-4 py-3">
                      <ActionButtons req={req} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All Button */}
          <div className="mt-4">
            <Link
              to="/dashboard/my-donation-requests"
              className="bg-red-600 hover:bg-red-700 text-white 
              px-5 py-2 rounded-lg text-sm font-medium transition-all"
            >
              View My All Requests →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

//  Status Badge
const StatusBadge = ({ status }) => {
  const styles = {
    pending: "bg-yellow-100 text-yellow-800",
    inprogress: "bg-blue-100 text-blue-800",
    done: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium 
      ${styles[status]}`}
    >
      {status}
    </span>
  );
};

//  Action Buttons
const ActionButtons = ({ req }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {/* inprogress হলে Done ও Cancel দেখাবে */}
      {req.status === "inprogress" && (
        <>
          <button
            className="bg-green-500 hover:bg-green-600 text-white 
          px-3 py-1 rounded-lg text-xs"
          >
            Done
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 
          px-3 py-1 rounded-lg text-xs"
          >
            Cancel
          </button>
        </>
      )}

      {/* pending হলে Edit ও Delete দেখাবে */}
      {req.status === "pending" && (
        <>
          <Link
            to={`/dashboard/edit-donation-request/${req._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white 
            px-3 py-1 rounded-lg text-xs"
          >
            Edit
          </Link>
          <button
            className="bg-red-500 hover:bg-red-600 text-white 
          px-3 py-1 rounded-lg text-xs"
          >
            Delete
          </button>
        </>
      )}

      {/* সব অবস্থায় View দেখাবে */}
      <Link
        to={`/dashboard/donation-details/${req._id}`}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 
        px-3 py-1 rounded-lg text-xs"
      >
        View
      </Link>
    </div>
  );
};

export default DonorHome;
