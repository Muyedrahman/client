import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [saved, setSaved] = useState(false);

  const nameParam = params.get("name");
  const emailParam = params.get("email");
  const amountParam = params.get("amount");

  const name = nameParam ? decodeURIComponent(nameParam) : "";
  const email = emailParam ? decodeURIComponent(emailParam) : "";
  const amount = amountParam ? Number(amountParam) : 0; // 

  const displayName = name || user?.displayName || "Anonymous";
  const displayEmail = email || user?.email || "N/A";

  useEffect(() => {
    if (loading) return;
    if (!user || !amount || saved) return;

    const saveFund = async () => {
      try {
        const token = await user.getIdToken();
        await axios.post(
          `${import.meta.env.VITE_API_URL}/funds`,
          { name: displayName, email: displayEmail, amount },
          { headers: { authorization: `Bearer ${token}` } }
        );

        setSaved(true);
        toast.success("Payment Successful 🎉");

        // setTimeout(() => {
        //   navigate("/funding");
        // }, 2000);
      } catch (err) {
        console.error(err);
        toast.error("Payment done but save failed");
      }
    };

    saveFund();
  }, [user, loading, amount, saved]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center">

        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">Thank you for your contribution ❤️</p>

        <div className="bg-green-50 rounded-xl p-4 text-left space-y-2">
          <p><span className="font-semibold">Name:</span> {displayName}</p>
          <p><span className="font-semibold">Email:</span> {displayEmail}</p>
          <p>
            <span className="font-semibold">Amount:</span>{" "}
            <span className="font-bold text-green-700">${amount}</span>
          </p>
        </div>

        {!saved ? (
          <p className="mt-4 text-gray-500 animate-pulse">Saving payment info...</p>
        ) : (
          <p className="mt-4 text-green-600 font-semibold">Redirecting to funding page...</p>
        )}

        <button
          onClick={() => navigate("/founding")}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold"
        >
          Go to Funding Page
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
