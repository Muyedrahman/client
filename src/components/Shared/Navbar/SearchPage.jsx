import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useLoaderData } from "react-router";

const SearchPage = () => {
  const { setLoading } = useAuth();
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [results, setResults] = useState([]);
  const [requests, setRequests] = useState([]);
  const data = useLoaderData();

  // Blood groups
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  // Fetch donation requests from backend
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/donation-requests?status=pending`
        );
        setRequests(res.data); // keep all requests for filtering
        setResults([]); // start with empty results
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter function
  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = requests.filter(
      (req) =>
        (bloodGroup ? req.bloodGroup === bloodGroup : true) &&
        (district ? req.district === district : true) &&
        (upazila ? req.recipientUpazila === upazila : true)
    );
    setResults(filtered);
  };

  return (
    <div className="min-h-screen bg-red-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-red-700 mb-8">
          Find Blood Donors
        </h2>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          {/* Blood Group */}
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="">Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setUpazila(""); // reset upazila when district changes
            }}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <option value="">District</option>
            {data.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-300"
            disabled={!district}
          >
            <option value="">Upazila</option>
            {data
              .find((d) => d.name === district)
              ?.upazilas.map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
          </select>

          {/* Search Button */}
          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transform transition py-3"
          >
            Search
          </button>
        </form>

        {/* Results */}
        {results.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No donors found. Fill the search form and click Search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((req) => (
              <div
                key={req._id}
                className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-red-700">
                      {req.requesterName}
                    </h3>
                    <p className="text-gray-500 text-sm">{req.requesterEmail}</p>
                  </div>
                  <div className="bg-red-100 text-red-700 font-bold px-3 py-1 rounded-full">
                    {req.bloodGroup}
                  </div>
                </div>
                <p className="text-gray-600">
                  <span className="font-semibold">District:</span>{" "}
                  {req.district || "N/A"}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Upazila:</span>{" "}
                  {req.recipientUpazila || "N/A"}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Hospital:</span>{" "}
                  {req.hospitalName || "N/A"}
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">Address:</span>{" "}
                  {req.fullAddress || "N/A"}
                </p>
                <button className="mt-4 w-full bg-red-500 text-white rounded-xl py-2 font-semibold hover:bg-red-600 transition">
                  Contact
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
