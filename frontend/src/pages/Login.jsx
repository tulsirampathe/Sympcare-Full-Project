import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const [state, setState] = useState("Sign Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, setToken } = useContext(AppContext);

  // ✅ Simple email validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!validateEmail(email))
      return toast.error("Please enter a valid email address");

    setLoading(true);
    try {
      const url = `${backendUrl}/api/user/${
        state === "Sign Up" ? "register" : "login"
      }`;
      const payload =
        state === "Sign Up" ? { name, email, password } : { email, password };

      const { data } = await axios.post(url, payload);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success(`${state} successful`);
        navigate("/");
      } else {
        toast.error(data.message || `${state} failed`);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || `${state} failed`);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google Login Handler
  const responseGoogle = async (response) => {
    let toastId;
    try {
      setGoogleLoading(true);
      toastId = toast.loading("Logging in with Google...");

      const authCode = response?.code;
      if (!authCode) {
        toast.error("Google login failed. Please try again.");
        return;
      }

      const { data } = await axios.post(
        `${backendUrl}/api/user/loginWithGoogle`,
        { code: authCode }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Logged in successfully with Google");
        navigate("/");
      } else {
        toast.error(data.message || "Google login failed.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Google login error");
    } finally {
      toast.dismiss(toastId);
      setGoogleLoading(false);
    }
  };

  const handleLoginWithGoogle = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: "auth-code",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm border border-gray-200"
      >
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-sm text-gray-500 mb-5">
          Please {state === "Sign Up" ? "sign up" : "log in"} to continue
        </p>

        {state === "Sign Up" && (
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-600 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || googleLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
        >
          {loading ? "Please wait..." : state}
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-xs text-gray-400">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleLoginWithGoogle}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 font-medium"
        >
          {googleLoading ? (
            "Connecting..."
          ) : (
            <>
              <FaGoogle className="mr-2 text-lg" />
              Sign in with Google
            </>
          )}
        </button>

        <p className="mt-5 text-sm text-center text-gray-600">
          {state === "Sign Up"
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() =>
              setState(state === "Sign Up" ? "Login" : "Sign Up")
            }
          >
            {state === "Sign Up" ? "Login" : "Sign Up"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
