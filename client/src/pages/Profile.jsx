import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState(null);
  const [productsCount, setProductsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
    fetchProfileStats();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfileStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/auth/profile-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProductsCount(response.data.productsCount);
      setWishlistCount(response.data.wishlistCount);
    } catch (error) {
      console.log(error);
    }
  };

  const themeColors = {
    background: "#FAF6F1",
    navBar: "#EADBC8",
    primaryButton: "#C97B63",
    text: "#3D2C2E",
    cardBackground: "#FFFDF9",
  };

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: themeColors.background,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div style={{ fontSize: "18px", color: themeColors.text, fontWeight: "600" }}>
          Loading your profile...
        </div>
      </div>
    );
  }

  const userInitial = user.name?.charAt(0).toUpperCase() || "U";
  const memberSince = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const cardStyle = {
    background: themeColors.cardBackground,
    borderRadius: "16px",
    boxShadow: "0 14px 35px rgba(61, 44, 46, 0.08)",
    border: "1px solid rgba(234, 219, 200, 0.7)",
    padding: "28px",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: themeColors.background,
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "38px",
              fontWeight: "800",
              color: themeColors.text,
              margin: "0",
              lineHeight: "1.2",
            }}
          >
            Account
          </h1>
          <p
            style={{
              fontSize: "17px",
              color: "#6E5D57",
              margin: "12px 0 0 0",
              lineHeight: "1.7",
            }}
          >
            Manage your profile, listings, and sustainability impact.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px", marginBottom: "28px" }}>
          {/* Account Overview Section */}
          <div style={cardStyle}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "18px",
                marginBottom: "28px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: themeColors.primaryButton,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 8px 25px rgba(201, 123, 99, 0.2)",
                }}
              >
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "700",
                    color: themeColors.cardBackground,
                  }}
                >
                  {userInitial}
                </span>
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: themeColors.text,
                    margin: "0 0 4px 0",
                  }}
                >
                  {user.name}
                </h2>
                {user.role === "admin" && (
                  <span
                    style={{
                      display: "inline-block",
                      background: "#E8D4C4",
                      color: "#3D2C2E",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "700",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Administrator
                  </span>
                )}
              </div>
            </div>

            <div style={{ borderTop: "1px solid #e8dfd6", paddingTop: "20px" }}>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "12px", color: "#8b7d7f", fontWeight: "700", margin: "0 0 6px 0", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  Email
                </p>
                <p style={{ fontSize: "15px", color: themeColors.text, margin: "0", fontWeight: "500" }}>
                  {user.email}
                </p>
              </div>

              <div>
                <p style={{ fontSize: "12px", color: "#8b7d7f", fontWeight: "700", margin: "0 0 6px 0", textTransform: "uppercase", letterSpacing: "0.02em" }}>
                  Member Since
                </p>
                <p style={{ fontSize: "15px", color: themeColors.text, margin: "0", fontWeight: "500" }}>
                  {memberSince}
                </p>
              </div>
            </div>
          </div>

          {/* Activity Summary Section */}
          <div style={cardStyle}>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "800",
                color: themeColors.text,
                margin: "0 0 20px 0",
                textTransform: "uppercase",
                letterSpacing: "0.02em",
              }}
            >
              Activity Summary
            </h3>

            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <p style={{ fontSize: "12px", color: "#8b7d7f", fontWeight: "700", margin: "0 0 6px 0" }}>
                  Products Listed
                </p>
                <p style={{ fontSize: "28px", fontWeight: "800", color: themeColors.primaryButton, margin: "0" }}>
                  {productsCount}
                </p>
              </div>

              <div>
                <p style={{ fontSize: "12px", color: "#8b7d7f", fontWeight: "700", margin: "0 0 6px 0" }}>
                  Saved Items
                </p>
                <p style={{ fontSize: "28px", fontWeight: "800", color: themeColors.primaryButton, margin: "0" }}>
                  {wishlistCount}
                </p>
              </div>

              <div style={{ paddingTop: "8px", borderTop: "1px solid #e8dfd6" }}>
                <p style={{ fontSize: "12px", color: "#8b7d7f", fontWeight: "700", margin: "12px 0 0 0" }}>
                  Items Reused
                </p>
                <p style={{ fontSize: "24px", fontWeight: "800", color: "#2E7D32", margin: "4px 0 0 0" }}>
                  {productsCount}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sustainability Impact Section */}
        <div style={cardStyle}>
          <h3
            style={{
              fontSize: "16px",
              fontWeight: "800",
              color: themeColors.text,
              margin: "0 0 14px 0",
              textTransform: "uppercase",
              letterSpacing: "0.02em",
            }}
          >
            Sustainability Impact
          </h3>
          <p
            style={{
              fontSize: "15px",
              color: "#6E5D57",
              margin: "0",
              lineHeight: "1.8",
            }}
          >
            By listing {productsCount} {productsCount === 1 ? "item" : "items"} on THRIFTS, you've helped extend their lifespan and reduced textile waste. Every item reused is one less in landfills. Thank you for making a difference.
          </p>
        </div>

        {/* Quick Actions Section */}
        <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: themeColors.primaryButton,
              color: themeColors.cardBackground,
              border: "none",
              borderRadius: "14px",
              padding: "14px 24px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#b86953";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = themeColors.primaryButton;
              e.target.style.transform = "translateY(0)";
            }}
          >
            View My Listings
          </button>

          <button
            onClick={() => navigate("/wishlist")}
            style={{
              background: themeColors.navBar,
              color: themeColors.text,
              border: "none",
              borderRadius: "14px",
              padding: "14px 24px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#d4c5b4";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = themeColors.navBar;
              e.target.style.transform = "translateY(0)";
            }}
          >
            View Saved Items
          </button>

          <button
            style={{
              background: "transparent",
              color: themeColors.text,
              border: `2px solid #e8dfd6`,
              borderRadius: "14px",
              padding: "12px 24px",
              fontSize: "15px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = themeColors.primaryButton;
              e.target.style.color = themeColors.primaryButton;
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "#e8dfd6";
              e.target.style.color = themeColors.text;
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;