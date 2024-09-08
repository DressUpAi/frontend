import React, { useState } from "react";
import { Button } from "@/components/ui/button"

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setIsLogin(true); // Switch to login page
    }, 2000); // 2 seconds delay before switching to login
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full sm:w-[480px] flex flex-col justify-between border border-gray-200 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
        <div className="flex justify-around mb-8">
           <Button>Click me</Button>
          <button
            className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              isLogin
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 ${
              !isLogin
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <div className="flex-grow flex items-center justify-center">
          {isLogin ? <LoginForm /> : <RegisterForm onSuccess={handleRegistrationSuccess} />}
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold text-green-600">Registration Successful!</h2>
            <p className="mt-2 text-gray-700">Redirecting to login...</p>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle =
  "w-96 px-4 py-3 rounded-lg bg-white border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:shadow-md";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed to login
    console.log("Login Form Submitted", { email, password });
  };

  return (
    <form
      className="space-y-10 flex flex-col justify-around h-full items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 font-semibold text-lg w-full">
          Email
        </label>
        <input
          type="email"
          className={inputStyle}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 font-semibold text-lg w-full">
          Password
        </label>
        <input
          type="password"
          className={inputStyle}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
      </div>
      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        Login
      </button>
    </form>
  );
};

const RegisterForm = ({ onSuccess }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!username) {
      newErrors.username = "Username is required";
    }

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long and include a mix of alphabets, digits, and special characters";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed to registration
    console.log("Registration Form Submitted", { username, email, password });
    onSuccess(); // Trigger success popup
  };

  return (
    <form
      className="space-y-6 flex flex-col justify-around h-full items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 font-semibold text-lg w-full">
          Username
        </label>
        <input
          type="text"
          className={inputStyle}
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username}</span>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 font-semibold text-lg w-full">
          Email
        </label>
        <input
          type="email"
          className={inputStyle}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email}</span>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 font-semibold text-lg w-full">
          Password
        </label>
        <input
          type="password"
          className={inputStyle}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password}</span>
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <label className="block text-gray-700 font-semibold text-lg w-full">
          Confirm Password
        </label>
        <input
          type="password"
          className={inputStyle}
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 text-sm">{errors.confirmPassword}</span>
        )}
      </div>
      <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        Register
      </button>
    </form>
  );
};

export default Login;
