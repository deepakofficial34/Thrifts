import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const themeColors = {
    background: "#FAF6F1",
    cardBackground: "#FFFFFF",
    primaryButton: "#C97B63",
    text: "#3D2C2E",
    accent: "#6B5B5B",
    textSecondary: "#6E5D57",
    border: "#E8DFD6",
    available: "#E6F4EA",
    availableText: "#227A32",
    sold: "#FFEAE8",
    soldText: "#B71C1C",
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuyNow = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.post(
        `/orders/create/${product._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { order, razorpayOrder } = response.data;
      console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "THRIFTS",
        description: product.title,
        order_id: razorpayOrder.id,
        handler: async function (paymentResponse) {
          try {
            await api.post(
              "/orders/verify",
              {
                ...paymentResponse,
                orderId: order._id,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("Payment Successful!");
            fetchProduct();
          } catch (error) {
            console.log(error);
          }
        },
        theme: {
          color: "#C97B63",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: themeColors.background,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <div style={{ fontSize: "18px", color: themeColors.text, fontWeight: "600" }}>
          Loading product details...
        </div>
      </div>
    );
  }

  const savings = product.originalPrice
    ? Math.max(0, product.originalPrice - product.price)
    : 0;
  const savingsPercent = product.originalPrice
    ? Math.round((savings / product.originalPrice) * 100)
    : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: themeColors.background,
        padding: "48px 24px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* Hero Section */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr",
            gap: "48px",
            marginBottom: "60px",
            alignItems: "start",
          }}
        >
          {/* Left: Image Gallery */}
          <div>
            {product.images?.length > 0 && (
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  maxWidth: "520px",
                  margin: "0 auto",
                  borderRadius: "24px",
                  boxShadow: "0 20px 60px rgba(61, 44, 46, 0.15)",
                }}
              >
                <img
                  src={product.images[0]}
                  alt={product.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    borderRadius: "24px",
                    display: "block",
                  }}
                />
              </div>
            )}
          </div>

          {/* Right: Product Information */}
          <div>
            {/* Availability Badge */}
            <span
              style={{
                display: "inline-block",
                background:
                  product.status === "sold"
                    ? themeColors.sold
                    : themeColors.available,
                color:
                  product.status === "sold"
                    ? themeColors.soldText
                    : themeColors.availableText,
                borderRadius: "999px",
                padding: "10px 16px",
                fontSize: "13px",
                fontWeight: "700",
                marginBottom: "24px",
                letterSpacing: "0.5px",
              }}
            >
              {product.status === "sold" ? "Sold Out" : "Available"}
            </span>

            {/* Title */}
            <h1
              style={{
                fontSize: "42px",
                fontWeight: "800",
                color: themeColors.text,
                margin: "0 0 32px 0",
                lineHeight: "1.25",
              }}
            >
              {product.title}
            </h1>

            {/* Pricing Section */}
            <div
              style={{
                background: themeColors.cardBackground,
                border: `1px solid ${themeColors.border}`,
                borderRadius: "16px",
                padding: "28px",
                marginBottom: "32px",
                boxShadow: "0 4px 12px rgba(61, 44, 46, 0.08)",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <p
                  style={{
                    fontSize: "10px",
                    color: themeColors.textSecondary,
                    fontWeight: "600",
                    margin: "0 0 8px 0",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Current Price
                </p>
                <p
                  style={{
                    fontSize: "32px",
                    fontWeight: "800",
                    color: themeColors.primaryButton,
                    margin: "0",
                  }}
                >
                  ₹{product.price}
                </p>
              </div>

              {product.originalPrice && (
                <>
                  <div style={{ marginBottom: "18px" }}>
                    <p
                      style={{
                        fontSize: "10px",
                        color: themeColors.textSecondary,
                        fontWeight: "600",
                        margin: "0 0 6px 0",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Original Price
                    </p>
                    <p
                      style={{
                        fontSize: "20px",
                        color: themeColors.accent,
                        margin: "0",
                        textDecoration: "line-through",
                        fontWeight: "600",
                      }}
                    >
                      ₹{product.originalPrice}
                    </p>
                  </div>

                  {savings > 0 && (
                    <div
                      style={{
                        paddingTop: "18px",
                        borderTop: `1px solid ${themeColors.border}`,
                      }}
                    >
                      <p
                        style={{
                          fontSize: "12px",
                          color: themeColors.availableText,
                          fontWeight: "700",
                          margin: "12px 0 0 0",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        You Save
                      </p>
                      <p
                        style={{
                          fontSize: "28px",
                          fontWeight: "800",
                          color: themeColors.availableText,
                          margin: "6px 0 0 0",
                        }}
                      >
                        ₹{savings} ({savingsPercent}%)
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "32px",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={handleBuyNow}
                disabled={product.status === "sold"}
                style={{
                  background:
                    product.status === "sold"
                      ? "#D0D0D0"
                      : themeColors.primaryButton,
                  color: "#FFFFFF",
                  border: "none",
                  borderRadius: "12px",
                  padding: "18px 36px",
                  fontSize: "18px",
                  fontWeight: "700",
                  cursor:
                    product.status === "sold" ? "not-allowed" : "pointer",
                  flex: "1",
                  minWidth: "200px",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 20px rgba(201, 123, 99, 0.15)",
                }}
                onMouseEnter={(e) => {
                  if (product.status !== "sold") {
                    e.target.style.background = "#B86952";
                    e.target.style.transform = "translateY(-3px)";
                    e.target.style.boxShadow =
                      "0 12px 30px rgba(201, 123, 99, 0.25)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (product.status !== "sold") {
                    e.target.style.background = themeColors.primaryButton;
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 8px 20px rgba(201, 123, 99, 0.15)";
                  }
                }}
              >
                {product.status === "sold" ? "Sold Out" : "Buy Now"}
              </button>

              {product.status === "available" && (
                <a
                  href={`mailto:${product.seller?.email}?subject=Interested in ${product.title}`}
                  style={{
                    background: "transparent",
                    color: themeColors.primaryButton,
                    border: `2px solid ${themeColors.primaryButton}`,
                    borderRadius: "12px",
                    padding: "16px 36px",
                    fontSize: "18px",
                    fontWeight: "700",
                    cursor: "pointer",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: "1",
                    minWidth: "200px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = themeColors.primaryButton;
                    e.target.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "transparent";
                    e.target.style.color = themeColors.primaryButton;
                  }}
                >
                  Contact Seller
                </a>
              )}
            </div>

            {/* Seller Trust Section */}
            <div
              style={{
                background: themeColors.cardBackground,
                border: `1px solid ${themeColors.border}`,
                borderRadius: "16px",
                padding: "24px",
                boxShadow: "0 4px 12px rgba(61, 44, 46, 0.08)",
              }}
            >
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  color: themeColors.textSecondary,
                  margin: "0 0 16px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Seller Information
              </h3>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: themeColors.text,
                  margin: "0 0 8px 0",
                }}
              >
                {product.seller?.name}
              </p>
              <p
                style={{
                  fontSize: "14px",
                  color: themeColors.textSecondary,
                  margin: "0 0 16px 0",
                }}
              >
                {product.seller?.email}
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: themeColors.availableText,
                  fontWeight: "600",
                  margin: "0",
                }}
              >
                Verified member of THRIFTS marketplace
              </p>
            </div>
          </div>
        </div>

        {/* Product Description Section */}
        <div
          style={{
            background: themeColors.cardBackground,
            border: `1px solid ${themeColors.border}`,
            borderRadius: "16px",
            padding: "40px",
            marginBottom: "40px",
            boxShadow: "0 4px 12px rgba(61, 44, 46, 0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: themeColors.text,
              margin: "0 0 24px 0",
            }}
          >
            About This Item
          </h2>
          <p
            style={{
              fontSize: "16px",
              color: themeColors.textSecondary,
              lineHeight: "1.8",
              margin: "0",
            }}
          >
            {product.description}
          </p>
        </div>

        {/* Product Highlights */}
        <div style={{ marginBottom: "40px" }}>
          <h2
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: themeColors.text,
              margin: "0 0 24px 0",
            }}
          >
            Product Details
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{
                background: themeColors.cardBackground,
                border: `1px solid ${themeColors.border}`,
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(61, 44, 46, 0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: themeColors.textSecondary,
                  fontWeight: "700",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Condition
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: themeColors.text,
                  margin: "0",
                  textTransform: "capitalize",
                }}
              >
                {product.condition}
              </p>
            </div>

            <div
              style={{
                background: themeColors.cardBackground,
                border: `1px solid ${themeColors.border}`,
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(61, 44, 46, 0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: themeColors.textSecondary,
                  fontWeight: "700",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Location
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: themeColors.text,
                  margin: "0",
                }}
              >
                {product.location}
              </p>
            </div>

            <div
              style={{
                background: themeColors.cardBackground,
                border: `1px solid ${themeColors.border}`,
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(61, 44, 46, 0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: themeColors.textSecondary,
                  fontWeight: "700",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Product Age
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: themeColors.text,
                  margin: "0",
                }}
              >
                {product.productAge}
              </p>
            </div>

            <div
              style={{
                background: themeColors.cardBackground,
                border: `1px solid ${themeColors.border}`,
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(61, 44, 46, 0.08)",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: themeColors.textSecondary,
                  fontWeight: "700",
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Brand
              </p>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "800",
                  color: themeColors.text,
                  margin: "0",
                }}
              >
                {product.brand || "Unbranded"}
              </p>
            </div>
          </div>
        </div>

        {/* Sustainability Section */}
        <div
          style={{
            background: "linear-gradient(135deg, #FAF6F1 0%, #F5F0E8 100%)",
            border: `1px solid ${themeColors.border}`,
            borderRadius: "16px",
            padding: "48px",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(61, 44, 46, 0.08)",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: themeColors.text,
              margin: "0 0 16px 0",
            }}
          >
            Why Buy Pre-loved?
          </h2>
          <p
            style={{
              fontSize: "17px",
              color: themeColors.textSecondary,
              lineHeight: "1.8",
              margin: "0",
              maxWidth: "700px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Choosing second-hand products helps reduce waste, extend product lifecycles and reduce
            the environmental impact of fast fashion and overconsumption. Every purchase is a step
            towards a more sustainable future.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
