import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data); // 🐞 Debug

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Store user and token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/home", { replace: true }); // ✅ Navigate to home
    } catch (err) {
      console.error("Login Error:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F3EF]">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-[#D2C1B6]">
        <h2 className="text-2xl font-bold text-[#1B3C53] mb-6 text-center">
          Login to SkillSwap
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#1B3C53] font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53] focus:outline-none focus:ring-2 focus:ring-[#456882]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-[#1B3C53] font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border border-[#D2C1B6] rounded-md text-[#1B3C53] focus:outline-none focus:ring-2 focus:ring-[#456882]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-[#F9F3EF] rounded-md transition ${
              loading
                ? "bg-[#9FB2C4] cursor-not-allowed"
                : "bg-[#456882] hover:bg-[#1B3C53]"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#1B3C53]">
          Don't have an account?{" "}
          <a href="/signup" className="text-[#456882] underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
