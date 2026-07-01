import { Link } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";

function ProductCard({ product, showWishlistButton = true }) {
  const [saved, setSaved] = useState(false);

  const handleWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/wishlist/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSaved(true);
    } catch (error) {
      if (error.response?.data?.message === "Product already in wishlist") {
        setSaved(true);
      } else {
        alert(error.response?.data?.message);
      }
    }
  };

  const badgeStyles = {
    available: {
      label: "Available",
      background: "#E6F4EA",
      color: "#227A32",
      border: "1px solid rgba(46, 125, 50, 0.15)",
    },
    sold: {
      label: "Sold",
      background: "#FFEAE8",
      color: "#B71C1C",
      border: "1px solid rgba(183, 28, 28, 0.15)",
    },
  };

  const statusStyle = badgeStyles[product.status] || badgeStyles.available;

  return (
    <div
      style={{
        background: "#FFFDF9",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(234, 219, 200, 0.7)",
        boxShadow: "0 14px 30px rgba(61, 44, 46, 0.08)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 40px rgba(61, 44, 46, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 14px 30px rgba(61, 44, 46, 0.08)";
      }}
    >
      <div style={{ position: "relative", height: "170px", overflow: "hidden" }}>
        <img
          src={
            product.images?.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/400x260?text=No+Image"
          }
          alt={product.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        <span
          style={{
            position: "absolute",
            top: "14px",
            right: "14px",
            background: statusStyle.background,
            color: statusStyle.color,
            border: statusStyle.border,
            borderRadius: "999px",
            padding: "8px 12px",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.01em",
          }}
        >
          {statusStyle.label}
        </span>
      </div>

      <div style={{ padding: "18px 18px 16px", minHeight: "210px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <h3
            style={{
              margin: "0 0 10px 0",
              fontSize: "18px",
              fontWeight: "800",
              lineHeight: "1.25",
              color: "#3D2C2E",
              minHeight: "48px",
            }}
          >
            {product.title}
          </h3>

          <p
            style={{
              margin: "0 0 16px 0",
              color: "#6E5D57",
              fontSize: "13px",
              lineHeight: "1.6",
              minHeight: "46px",
            }}
          >
            {product.description?.slice(0, 90) || "No description available."}
            {product.description?.length > 90 ? "..." : ""}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "10px", flexWrap: "wrap" }}>
          <span
            style={{
              fontSize: "22px",
              fontWeight: "900",
              color: "#3D2C2E",
            }}
          >
            ₹{product.price}
          </span>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end", width: "100%" }}>
            {product.status === "available" && showWishlistButton && (
              <button
                onClick={handleWishlist}
                style={{
                  background: "transparent",
                  color: "#3D2C2E",
                  border: "1px solid #C97B63",
                  borderRadius: "12px",
                  padding: "8px 14px",
                  cursor: "pointer",
                  fontWeight: "700",
                  minWidth: "96px",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(201, 123, 99, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                }}
              >
                {saved ? "Saved" : "Save"}
              </button>
            )}

            <Link
              to={`/product/${product._id}`}
              style={{
                background: "#C97B63",
                color: "#FFFDF9",
                borderRadius: "12px",
                padding: "10px 16px",
                textDecoration: "none",
                fontWeight: "700",
                textAlign: "center",
              }}
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;