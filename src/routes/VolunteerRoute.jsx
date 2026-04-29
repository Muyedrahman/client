import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, isRoleLoading] = useRole();

  //  Loading চলাকালীন spinner দেখাবে
  if (loading || isRoleLoading) return <LoadingSpinner />;

  //  Admin ও Volunteer দুজনেই এই route এ যেতে পারবে
  if (user && (role === "admin" || role === "volunteer")) {
    return children;
  }

  //  অন্য কেউ হলে login এ যাবে
  return <Navigate to="/login" replace />;
};

export default VolunteerRoute;
