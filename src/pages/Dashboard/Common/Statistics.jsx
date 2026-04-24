import AdminDashboard from "../../../components/Dashboard/Statistics/AdminDashboard";
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import useRole from "../../../hooks/useRole";
const Statistics = () => {
  const [role] = useRole();
  return (
    <div>
      {/* donor  */}

      {role === "donor" && <AdminStatistics />}

      {role === "volunteer" && <AdminDashboard></AdminDashboard>}
      {role === "admin" && <AdminDashboard></AdminDashboard>}
    </div>
  );
};

export default Statistics;
