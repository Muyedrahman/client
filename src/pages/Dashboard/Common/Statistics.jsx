import AdminHome from "../../../components/Dashboard/Statistics/AdminHome";
import DonorHome from "../../../components/Dashboard/Statistics/DonorHome";
import VolunteerHome from "../../../components/Dashboard/Statistics/VolunteerHome";
import useRole from "../../../hooks/useRole";


const Statistics = () => {
  const [role] = useRole();
  return (
    <div>
      {role === "donor" && <DonorHome />}
      {role === "volunteer" && <VolunteerHome />}
      {role === "admin" && <AdminHome />}

    </div>
  );
};

export default Statistics;
