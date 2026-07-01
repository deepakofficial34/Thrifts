import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleReset = async () => {
    try {
      const response = await api.post(
        `/auth/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message);
      setMessageType("error");
    }
  };

  const inputBaseStyle = {
    width: "100%",
    minHeight: "54px",
    padding: "14px 18px",
    borderRadius: "14px",
    border: "1px solid rgba(61, 44, 46, 0.12)",
    background: "#FFFFFF",
    color: "#3D2C2E",
    fontSize: "15px",
    outline: "none",
    transition: "border-color 0.24s ease, box-shadow 0.24s ease",
    boxSizing: "border-box",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "#FAF6F1",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#FFFFFF",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 24px 60px rgba(61, 44, 46, 0.12)",
          border: "1px solid rgba(61, 44, 46, 0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "rgba(201, 123, 63, 0.12)",
              display: "grid",
              placeItems: "center",
            }}
          >
            <svg
              width="28"
              height="32"
              viewBox="0 0 28 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 12V9.5C8 6.46243 10.4624 4 13.5 4C16.5376 4 19 6.46243 19 9.5V12"
                stroke="#C97B63"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <rect
                x="6"
                y="12"
                width="16"
                height="14"
                rx="7"
                stroke="#C97B63"
                strokeWidth="2.2"
              />
              <circle cx="14" cy="20" r="2.8" fill="#C97B63" />
            </svg>
          </div>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "30px",
            lineHeight: 1.1,
            fontWeight: 700,
            color: "#3D2C2E",
            textAlign: "center",
            marginBottom: "12px",
          }}
        >
          Create New Password
        </h1>
        <p
          style={{
            margin: 0,
            color: "#7B655D",
            fontSize: "15px",
            lineHeight: 1.7,
            textAlign: "center",
            marginBottom: "32px",
          }}
        >
          Choose a strong password to protect your account.
        </p>

        {message && (
          <div
            style={{
              marginBottom: "24px",
              padding: "16px 18px",
              borderRadius: "14px",
              border: messageType === "success"
                ? "1px solid rgba(46, 106, 61, 0.18)"
                : "1px solid rgba(143, 38, 38, 0.18)",
              background: messageType === "success"
                ? "#ECF7EE"
                : "#FDEDEE",
              color: messageType === "success"
                ? "#2E6A3D"
                : "#8F2626",
              fontSize: "14px",
              lineHeight: 1.6,
            }}
          >
            {message}
          </div>
        )}

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="new-password"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#3D2C2E",
            }}
          >
            New Password
          </label>
          <input
            id="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
            style={inputBaseStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "#C97B63";
              e.target.style.boxShadow = "0 0 0 4px rgba(201, 123, 99, 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(61, 44, 46, 0.12)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label
            htmlFor="confirm-password"
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: 600,
              color: "#3D2C2E",
            }}
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
            style={inputBaseStyle}
            onFocus={(e) => {
              e.target.style.borderColor = "#C97B63";
              e.target.style.boxShadow = "0 0 0 4px rgba(201, 123, 99, 0.12)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "rgba(61, 44, 46, 0.12)";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          onClick={handleReset}
          style={{
            width: "100%",
            minHeight: "52px",
            borderRadius: "14px",
            border: "none",
            background: "#C97B63",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: 700,
            cursor: "pointer",
            transition: "transform 0.24s ease, box-shadow 0.24s ease, background 0.24s ease",
            boxShadow: "0 12px 28px rgba(201, 123, 99, 0.18)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 16px 34px rgba(201, 123, 99, 0.24)";
            e.currentTarget.style.background = "#B76A57";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(201, 123, 99, 0.18)";
            e.currentTarget.style.background = "#C97B63";
          }}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;
