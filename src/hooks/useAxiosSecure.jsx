import { useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "./useAuth";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { user, logOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      // ✅ Request Interceptor
      const requestInterceptor = axiosInstance.interceptors.request.use(
        async (config) => {
          // ✅ getIdToken() → token expire হলে auto refresh করে
          const token = await user.getIdToken();
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        },
      );

      // ✅ Response Interceptor
      const responseInterceptor = axiosInstance.interceptors.response.use(
        (res) => res,
        (err) => {
          if (err?.response?.status === 401 || err?.response?.status === 403) {
            logOut()
              .then(() => console.log("Logged out successfully."))
              .catch(console.error);
            navigate("/login");
          }
          return Promise.reject(err);
        },
      );

      // ✅ Cleanup - multiple interceptor থেকে বাঁচায়
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [user, loading, logOut, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
