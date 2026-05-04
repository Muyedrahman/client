// import useAuth from "./useAuth";

// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "./useAxiosSecure";

// const useRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: role, isLoading: isRoleLoading } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: ["role", user?.email],
//     queryFn: async () => {
//       const result = await axiosSecure(`/user/role`);
//       // console.log(result);
//       return result.data.role;
//     },
//   });

//   //   return { role, isRoleLoading }
//   return [role, isRoleLoading];
// };

// export default useRole;




// 1
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !loading && !!user?.email, // ✅ user থাকলেই call করবে
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const result = await axiosSecure.get(`/user/role`); // ✅ .get() যোগ
      return result.data.role;
    },
  });

  return [role, isRoleLoading];
};

export default useRole;


// 2
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";


// const useRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: role,
//     isLoading: isRoleLoading,
//     refetch,
//   } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: ["role", user?.email],
//     queryFn: async () => {
//       const result = await axiosSecure.get("/user/role");
//       return result.data.role;
//     },
//   });

//   return { role, isRoleLoading, refetch };
// };

// export default useRole;