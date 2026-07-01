import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      localStorage.setItem(
  "token",
  response.data.token
);

navigate("/");
    } catch (error) {
  setErrorMessage(
    error.response?.data?.message ||
    "Invalid email or password"
  );
}
  };

  const themeColors = {
    background: "#FAF6F1",
    navBar: "#EADBC8",
    primaryButton: "#C97B63",
    text: "#3D2C2E",
    cardBackground: "#FFFDF9",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: `linear-gradient(135deg, ${themeColors.background} 0%, #f5ead6 100%)`,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: themeColors.cardBackground,
          padding: "50px 40px",
          borderRadius: "12px",
          boxShadow: "0 10px 40px rgba(61, 44, 46, 0.1), 0 2px 8px rgba(61, 44, 46, 0.05)",
          width: "100%",
          maxWidth: "420px",
        }}
      >
        {/* Welcome Back Heading */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: themeColors.text,
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Welcome Back
        </h1>
        
        <p
          style={{
            fontSize: "14px",
            color: "#8b7d7f",
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          Sign in to your THRIFTS account
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div
            style={{
              background: "#fee",
              color: "#c33",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
              border: "1px solid #fcc",
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Email Input */}
        <div style={{ marginBottom: "18px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: themeColors.text,
              marginBottom: "8px",
            }}
          >
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "15px",
              border: "2px solid #e8dfd6",
              borderRadius: "8px",
              boxSizing: "border-box",
              color: themeColors.text,
              background: "#fefdfb",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = themeColors.primaryButton;
              e.target.style.boxShadow = `0 0 0 3px rgba(201, 123, 99, 0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e8dfd6";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "26px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "600",
              color: themeColors.text,
              marginBottom: "8px",
            }}
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px",
              fontSize: "15px",
              border: "2px solid #e8dfd6",
              borderRadius: "8px",
              boxSizing: "border-box",
              color: themeColors.text,
              background: "#fefdfb",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = themeColors.primaryButton;
              e.target.style.boxShadow = `0 0 0 3px rgba(201, 123, 99, 0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e8dfd6";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Forgot Password Link */}
        <div style={{ marginBottom: "24px", textAlign: "right" }}>
          <a
            href="/forgot-password"
            style={{
              fontSize: "14px",
              color: themeColors.primaryButton,
              textDecoration: "none",
              fontWeight: "500",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#a86349")}
            onMouseLeave={(e) => (e.target.style.color = themeColors.primaryButton)}
          >
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px 20px",
            fontSize: "16px",
            fontWeight: "700",
            background: themeColors.primaryButton,
            color: "#FFFDF9",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(201, 123, 99, 0.3)",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#b36a52";
            e.target.style.boxShadow = "0 6px 20px rgba(201, 123, 99, 0.4)";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = themeColors.primaryButton;
            e.target.style.boxShadow = "0 4px 15px rgba(201, 123, 99, 0.3)";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Sign In
        </button>

        <button
  type="button"
  onClick={() => {
    window.location.href =
      "https://thrifts-backend.onrender.com/api/auth/google";
  }}
  style={{
    width: "100%",
    padding: "14px 20px",
    fontSize: "16px",
    fontWeight: "600",
    background: "#ffffff",
    color: "#3D2C2E",
    border: "2px solid #e8dfd6",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "12px",
  }}
>
  Continue with Google
</button>

        {/* Sign Up Link */}
        <p
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "14px",
            color: themeColors.text,
          }}
        >
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: themeColors.primaryButton,
              textDecoration: "none",
              fontWeight: "600",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#a86349")}
            onMouseLeave={(e) => (e.target.style.color = themeColors.primaryButton)}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;