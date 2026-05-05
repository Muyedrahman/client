import { useForm } from "react-hook-form";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import SocialLogin from "../Auth/SocialLogin/SocialLogin";

const LoginPage = () => {
  const { signIn, loading,user,setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
if (user) return <Navigate to={from} replace={true} />;

  if (loading) return <LoadingSpinner></LoadingSpinner>;



  // LOGIN FUNCTIONALITY

  const onSubmit = async (data) => {
    try {
      const { email, password } = data;
      const result = await signIn(email, password);

      console.log("Login success:", result);
      toast.success("Login Successful ");
      navigate("/");  
    } catch (err) {
      console.log(err);
      if (err.message.includes("auth/invalid-credential")) {
        toast.error("Incorrect Email or  password!");
        setLoading(false)
      } else {
        toast.error("Login Failed!");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Login to Blood Donation
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Enter your email and password to continue
        </p>

        <form
          className="mt-6 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div className="relative">
            <AiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-red-600"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-red-600 text-white font-semibold py-3 rounded-full shadow hover:bg-red-700 hover:scale-105 transition transform duration-300 mt-2"
          >
            login
          </button>
          <p className="text-gray-600 text-center mt-4">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-red-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>

          <SocialLogin></SocialLogin>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
