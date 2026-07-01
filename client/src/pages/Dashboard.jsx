import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const fetchMyProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(
        "/products/my-products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProducts(response.data.products);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(
        `/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMyProducts();
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/products/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMyProducts();
    } catch (error) {
      console.log(error.response?.data);
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
          My Listings
        </h1>

        {products.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "24px",
            }}
          >
            {products.map((product) => (
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

                <div style={{ padding: "18px 18px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "230px" }}>
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
                        margin: "0 0 14px 0",
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

                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <span
                      style={{
                        fontSize: "22px",
                        fontWeight: "900",
                        color: "#3D2C2E",
                      }}
                    >
                      ₹{product.price}
                    </span>

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "space-between" }}>
                      <Link
                        to={`/edit-product/${product._id}`}
                        style={{
                          background: "#C97B63",
                          color: "#FFFDF9",
                          borderRadius: "12px",
                          padding: "10px 14px",
                          textDecoration: "none",
                          fontWeight: "700",
                          minWidth: "92px",
                          textAlign: "center",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#b36a55";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#C97B63";
                        }}
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(product._id)}
                        style={{
                          background: "#FFF5F3",
                          color: "#B71C1C",
                          border: "1px solid #F1C6C1",
                          borderRadius: "12px",
                          padding: "10px 14px",
                          cursor: "pointer",
                          fontWeight: "700",
                          minWidth: "92px",
                          transition: "all 0.25s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = "#ffe8e4";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = "#FFF5F3";
                        }}
                      >
                        Delete
                      </button>

                      {product.status === "available" && (
                        <button
                          onClick={() => handleStatusChange(product._id, "sold")}
                          style={{
                            background: "#EEF6EE",
                            color: "#227A32",
                            border: "1px solid #D7ECD8",
                            borderRadius: "12px",
                            padding: "10px 14px",
                            cursor: "pointer",
                            fontWeight: "700",
                            minWidth: "92px",
                            transition: "all 0.25s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = "#e4f1e4";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = "#EEF6EE";
                          }}
                        >
                          Mark Sold
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "#FFFDF9",
              borderRadius: "16px",
              boxShadow: "0 10px 24px rgba(61, 44, 46, 0.08)",
              border: "1px solid rgba(234, 219, 200, 0.7)",
              padding: "50px 30px",
              textAlign: "center",
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
              No Listings Found
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#6E5D57",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              You haven’t listed any products yet. Start selling your pre-loved items to support sustainable reuse.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;