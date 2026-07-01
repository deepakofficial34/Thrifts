import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        "/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setWishlist(response.data.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(
        `/wishlist/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FAF6F1",
        padding: "40px 24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "36px",
            fontWeight: "800",
            color: "#3D2C2E",
            marginBottom: "24px",
          }}
        >
          Saved Items
        </h1>

        {wishlist.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {wishlist.map((item) => {
              const product = item.product;

              return (
                <div
                  key={product._id}
                  style={{
                    background: "#FFFDF9",
                    borderRadius: "16px",
                    boxShadow: "0 14px 30px rgba(61, 44, 46, 0.08)",
                    overflow: "hidden",
                    border: "1px solid rgba(234, 219, 200, 0.7)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
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
                        background: product.status === "sold" ? "#FFEAE8" : "#E6F4EA",
                        color: product.status === "sold" ? "#B71C1C" : "#227A32",
                        border: product.status === "sold" ? "1px solid rgba(183, 28, 28, 0.15)" : "1px solid rgba(46, 125, 50, 0.15)",
                        borderRadius: "999px",
                        padding: "8px 12px",
                        fontSize: "12px",
                        fontWeight: "700",
                      }}
                    >
                      {product.status === "sold" ? "Sold" : "Available"}
                    </span>
                  </div>

                  <div style={{ padding: "18px 18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "220px" }}>
                    <div>
                      <h2
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "18px",
                          fontWeight: "800",
                          color: "#3D2C2E",
                          lineHeight: "1.25",
                          minHeight: "48px",
                        }}
                      >
                        {product.title}
                      </h2>

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

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-between", alignItems: "center" }}>
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
                        <Link
                          to={`/product/${product._id}`}
                          style={{
                            background: "#C97B63",
                            color: "#FFFDF9",
                            borderRadius: "12px",
                            padding: "10px 14px",
                            textDecoration: "none",
                            fontWeight: "700",
                            textAlign: "center",
                          }}
                        >
                          View Details
                        </Link>

                        <button
                          onClick={() => handleRemove(product._id)}
                          style={{
                            background: "transparent",
                            border: "1px solid #C97B63",
                            color: "#3D2C2E",
                            borderRadius: "12px",
                            padding: "10px 14px",
                            cursor: "pointer",
                            fontWeight: "700",
                            transition: "all 0.25s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "rgba(201, 123, 99, 0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "transparent";
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              background: "#FFFDF9",
              borderRadius: "16px",
              boxShadow: "0 16px 30px rgba(61, 44, 46, 0.08)",
              border: "1px solid rgba(234, 219, 200, 0.7)",
              padding: "60px 30px",
              textAlign: "center",
              marginTop: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#3D2C2E",
                marginBottom: "16px",
              }}
            >
              No saved items yet.
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#6E5D57",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              Save products you love and revisit them later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;