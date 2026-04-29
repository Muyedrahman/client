import { useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ সব request load
  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-donation-requests", filter],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/donation-requests${filter ? `?status=${filter}` : ""}`,
      );
      return data;
    },
  });

  // ✅ Status Update
  const handleStatusUpdate = async (id, status) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Mark as ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      confirmButtonText: "Yes!",
    });

    if (result.isConfirmed) {
      await axiosSecure.patch(`/donation-requests/${id}`, { status });
      refetch();
      Swal.fire("Done!", `Status updated to ${status}`, "success");
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c0392b",
      confirmButtonText: "Yes, Delete!",
    });

    if (result.isConfirmed) {
      await axiosSecure.delete(`/donation-requests/${id}`);
      refetch();
      Swal.fire("Deleted!", "Request deleted successfully", "success");
    }
  };

  // ✅ Pagination
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const paginatedRequests = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-medium text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-red-50 min-h-screen">
      {/* Header */}
      <div
        className="flex flex-col md:flex-row justify-between
      items-center gap-4 mb-6"
      >
        <h2 className="text-2xl font-medium text-red-700">
          All Blood Donation Requests 🩸
        </h2>

        {/* ✅ Filter */}
        <div className="flex flex-wrap gap-2">
          {["", "pending", "inprogress", "done", "canceled"].map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-medium
              border transition-all
                ${
                  filter === f
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white border-gray-200 text-gray-600"
                }`}
            >
              {f === "" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow-md">
        <table className="w-full text-sm">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Requester</th>
              <th className="px-4 py-3 text-left">Recipient</th>
              <th className="px-4 py-3 text-left">Location</th>
              <th className="px-4 py-3 text-left">Blood</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Donor Info</th>
              <th className="px-4 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.map((req, idx) => (
              <tr
                key={req._id}
                className={idx % 2 === 0 ? "bg-white" : "bg-red-50"}
              >
                {/* Serial */}
                <td className="px-4 py-3">
                  {(currentPage - 1) * itemsPerPage + idx + 1}
                </td>

                {/* Requester */}
                <td className="px-4 py-3">
                  <p className="font-medium">{req.requesterName}</p>
                  <p className="text-xs text-gray-400">{req.requesterEmail}</p>
                </td>

                {/* Recipient */}
                <td className="px-4 py-3 font-medium">{req.recipientName}</td>

                {/* Location */}
                <td className="px-4 py-3 text-gray-500">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>

                {/* Blood Group */}
                <td className="px-4 py-3 font-medium text-red-600">
                  {req.bloodGroup}
                </td>

                {/* Date */}
                <td className="px-4 py-3">{req.donationDate}</td>

                {/* Status Badge */}
                <td className="px-4 py-3">
                  <StatusBadge status={req.status} />
                </td>

                {/* ✅ Donor Info - inprogress এ */}
                <td className="px-4 py-3 text-xs text-gray-500">
                  {req.status === "inprogress" ? (
                    <div>
                      <p className="font-medium text-gray-700">
                        {req.donorName}
                      </p>
                      <p>{req.donorEmail}</p>
                    </div>
                  ) : (
                    <span className="text-gray-300">—</span>
                  )}
                </td>

                {/* ✅ Action Buttons - Admin সব করতে পারবে */}
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {/* inprogress হলে Done ও Cancel */}
                    {req.status === "inprogress" && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(req._id, "done")}
                          className="bg-green-500 hover:bg-green-600
                          text-white px-2 py-1 rounded-lg text-xs"
                        >
                          Done
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, "canceled")
                          }
                          className="bg-gray-400 hover:bg-gray-500
                          text-white px-2 py-1 rounded-lg text-xs"
                        >
                          Cancel
                        </button>
                      </>
                    )}

                    {/* ✅ Edit - Admin সব request edit করতে পারবে */}
                    {req.status === "pending" && (
                      <Link
                        to={`/dashboard/edit-donation-request/${req._id}`}
                        className="bg-blue-500 hover:bg-blue-600
                        text-white px-2 py-1 rounded-lg text-xs"
                      >
                        Edit
                      </Link>
                    )}

                    {/* ✅ Delete - Admin সব request delete করতে পারবে */}
                    {req.status === "pending" && (
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="bg-red-500 hover:bg-red-600
                        text-white px-2 py-1 rounded-lg text-xs"
                      >
                        Delete
                      </button>
                    )}

                    {/* ✅ View - সব অবস্থায় */}
                    <Link
                      to={`/donation-requests/${req._id}`}
                      className="bg-gray-100 hover:bg-gray-200
                      text-gray-700 px-2 py-1 rounded-lg text-xs"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}

            {/* No Data */}
            {requests.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-10 text-gray-400">
                  No donation requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border text-sm
            disabled:opacity-40 bg-white hover:bg-red-50"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg border text-sm
                  ${
                    currentPage === page
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white hover:bg-red-50"
                  }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border text-sm
            disabled:opacity-40 bg-white hover:bg-red-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

// ✅ Status Badge
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

export default AllBloodDonationRequests;
