const existingUsers = [
  { username: "testuser", email: "test@example.com" },
  { username: "johndoe", email: "john@example.com" },
  // Add more existing users for testing
];

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Check if username or email already exists
    const isUsernameExists = existingUsers.some((user) => user.username === username);
    const isEmailExists = existingUsers.some((user) => user.email === email);

    if (isUsernameExists) {
      newErrors.username = "Username already exists. Please choose another.";
    }

    if (isEmailExists) {
      newErrors.email = "Email already exists. Please choose another.";
    }

    if (!username && !email) {
      newErrors.username = "Username or Email is required";
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8 || !/[!@#$%^&*]/.test(password)) {
      newErrors.password = "Password must be at least 8 characters long and include special characters.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed to registration
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsLogin(true); // Redirect to login after 2 seconds
    }, 2000);
  };

  return (
    <div>
      {success && (
        <div className="bg-green-500 text-white p-4 rounded-md shadow-md mb-4 text-center">
          Registration successful! Redirecting to login...
        </div>
      )}
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
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
};
