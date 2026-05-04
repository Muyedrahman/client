// import { Navigate } from "react-router-dom";
// import useAuth from "../hooks/useAuth";
// import useRole from "../hooks/useRole";
// import LoadingSpinner from "../components/Shared/LoadingSpinner";

// const VolunteerRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const [role, isRoleLoading] = useRole();

//   //  Loading চলাকালীন spinner দেখাবে
//   if (loading || isRoleLoading) return <LoadingSpinner />;

//   //  Admin ও Volunteer দুজনেই এই route এ যেতে পারবে
//   if (user && (role === "admin" || role === "volunteer")) {
//     return children;
//   }

//   //  অন্য কেউ হলে login এ যাবে
//   return <Navigate to="/login" replace />;
// };

// export default VolunteerRoute;

// GPT1
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // ✅ Admin + Volunteer দুজনেই যেতে পারবে
  if (user && (role === "admin" || role === "volunteer")) {
    return children;
  }

  return <Navigate to="/dashboard" state={{ from: location }} replace />;
};

export default VolunteerRoute;