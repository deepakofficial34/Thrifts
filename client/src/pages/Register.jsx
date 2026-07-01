import { useState } from "react";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await api.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      console.log(response.data);
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.log(error.response?.data);
      setErrorMessage(
        error.response?.data?.message ||
        "Registration failed. Please try again."
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
        {/* Create Account Heading */}
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: themeColors.text,
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Create Account
        </h1>
        
        <p
          style={{
            fontSize: "14px",
            color: "#8b7d7f",
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          Join THRIFTS and start buying & selling
        </p>

        {/* Success Message */}
        {successMessage && (
          <div
            style={{
              background: "#efe",
              color: "#3c3",
              padding: "12px 16px",
              borderRadius: "8px",
              marginBottom: "20px",
              fontSize: "14px",
              border: "1px solid #cfc",
            }}
          >
            {successMessage}
          </div>
        )}

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

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
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
              Full Name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
              required
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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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

          {/* Register Button */}
          <button
            type="submit"
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
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <p
          style={{
            marginTop: "24px",
            textAlign: "center",
            fontSize: "14px",
            color: themeColors.text,
          }}
        >
          Already have an account?{" "}
          <a
            href="/login"
            style={{
              color: themeColors.primaryButton,
              textDecoration: "none",
              fontWeight: "600",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.color = "#a86349")}
            onMouseLeave={(e) => (e.target.style.color = themeColors.primaryButton)}
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;