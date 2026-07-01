import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Home() {
  
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] =useState(1);
  const navigate = useNavigate();

  const themeColors = {
    background: "#FAF6F1",
    navBar: "#EADBC8",
    primaryButton: "#C97B63",
    text: "#3D2C2E",
    cardBackground: "#FFFDF9",
  };

  useEffect(() => {
  fetchProducts();
}, [keyword, category,sort,page]);


  const fetchProducts = async () => {
    try {
      const response = await api.get(
  `/products?keyword=${keyword}&category=${category}&sort=${sort}&page=${page}`
);

      setProducts(response.data.products);
setTotalPages(
  response.data.totalPages
);
    } catch (error) {
      console.log(error);
    }
  };

  const sustainabilityPoints = [
    {
      title: "Reduces Landfill Waste",
      description: "Every pre-loved item purchased is one less item in landfills, helping preserve our planet."
    },
    {
      title: "Extends Product Lifespan",
      description: "Give quality items a second life and maximize their usefulness before they become waste."
    },
    {
      title: "Combats Fast Fashion",
      description: "By choosing second-hand, you resist throwaway culture and support sustainable consumption."
    },
    {
      title: "Saves Money",
      description: "Get premium quality items at fraction of the price while making an environmental impact."
    },
    {
      title: "Reduces Carbon Footprint",
      description: "Buying pre-loved eliminates manufacturing emissions and transportation waste."
    },
    {
      title: "Supports Sustainable Living",
      description: "Join a community committed to mindful consumption and environmental responsibility."
    }
  ];

  return (
    <div
      style={{
        background: themeColors.background,
        minHeight: "100vh",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Hero Section */}
      <div
        style={{
          background: `linear-gradient(135deg, ${themeColors.background} 0%, #f5ead6 100%)`,
          padding: "100px 40px",
          textAlign: "center",
          borderBottom: `2px solid ${themeColors.navBar}`,
        }}
      >
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "800",
            color: themeColors.text,
            margin: "0 0 20px 0",
            letterSpacing: "-0.5px",
            lineHeight: "1.1",
          }}
        >
          Why Say Goodbye to Good Things?
        </h1>

        <p
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: themeColors.text,
            margin: "0 0 24px 0",
            lineHeight: "1.4",
          }}
        >
          Sustainable Living Starts Here.
        </p>

        <p
          style={{
            fontSize: "18px",
            color: "#7a6d6f",
            margin: "0 auto 40px auto",
            maxWidth: "760px",
            lineHeight: "1.75",
          }}
        >
          Every year, fast fashion and unnecessary consumption contribute to growing environmental waste. THRIFTS helps people buy and sell quality pre-loved products, extending their lifespan and promoting a more sustainable way of living.
        </p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => {
              const filterSection = document.getElementById("filter-section");
              if (filterSection) {
                filterSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            style={{
              padding: "16px 42px",
              fontSize: "16px",
              fontWeight: "700",
              background: themeColors.primaryButton,
              color: themeColors.cardBackground,
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 8px 25px rgba(201, 123, 99, 0.25)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#b36a52";
              e.target.style.boxShadow = "0 10px 30px rgba(201, 123, 99, 0.3)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = themeColors.primaryButton;
              e.target.style.boxShadow = "0 8px 25px rgba(201, 123, 99, 0.25)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Browse Products
          </button>

          <button
            onClick={() => navigate("/sell")}
            style={{
              padding: "16px 42px",
              fontSize: "16px",
              fontWeight: "700",
              background: "transparent",
              color: themeColors.primaryButton,
              border: `2px solid ${themeColors.primaryButton}`,
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = themeColors.primaryButton;
              e.target.style.color = themeColors.cardBackground;
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = themeColors.primaryButton;
            }}
          >
            Start Selling
          </button>
        </div>
      </div>

      {/* Why Choose Second-Hand Section */}
      <div
        style={{
          padding: "80px 40px",
          background: themeColors.cardBackground,
          borderBottom: `1px solid #f0e8dd`,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "40px",
              fontWeight: "800",
              color: themeColors.text,
              textAlign: "center",
              margin: "0 0 20px 0",
            }}
          >
            Why Choose Second-Hand?
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#7a6d6f",
              textAlign: "center",
              maxWidth: "780px",
              margin: "0 auto 50px auto",
              lineHeight: "1.75",
            }}
          >
            Thoughtful reuse avoids waste, supports mindful consumption, and gives well-made products a meaningful second life. These principles are at the heart of the THRIFTS experience.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                title: "Reducing Waste",
                description: "Choose pre-loved items to keep good things out of landfills and build a cleaner future.",
              },
              {
                title: "Fighting Fast Fashion",
                description: "Buying second-hand undermines fast fashion cycles and celebrates durable, thoughtful consumption.",
              },
              {
                title: "Saving Money",
                description: "Enjoy premium quality products at accessible prices without sacrificing sustainability.",
              },
              {
                title: "Extending Product Lifecycles",
                description: "Give items another chapter by passing them to someone who will value and use them.",
              },
            ].map((point, index) => (
              <div
                key={index}
                style={{
                  background: themeColors.background,
                  padding: "30px",
                  borderRadius: "14px",
                  boxShadow: "0 8px 28px rgba(61, 44, 46, 0.08)",
                  border: "1px solid #f0e8dd",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(61, 44, 46, 0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 28px rgba(61, 44, 46, 0.08)";
                }}
              >
                <h3
                  style={{
                    fontSize: "20px",
                    fontWeight: "800",
                    color: themeColors.text,
                    margin: "0 0 12px 0",
                  }}
                >
                  {point.title}
                </h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#7a6d6f",
                    margin: "0",
                    lineHeight: "1.7",
                  }}
                >
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          padding: "60px 40px 80px 40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Filter Section */}
        <div id="filter-section">
          <h2
            style={{
              fontSize: "32px",
              fontWeight: "800",
              color: themeColors.text,
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            Explore Sustainable Finds
          </h2>

          <p
            style={{
              fontSize: "16px",
              color: "#8b7d7f",
              marginBottom: "40px",
              margin: "0 0 40px 0",
              lineHeight: "1.6",
            }}
          >
            Discover quality second-hand products that give you style, value, and peace of mind. Each item here is an opportunity to make a sustainable choice without compromise.
          </p>

          {/* Filter Container */}
          <div
            style={{
              background: themeColors.cardBackground,
              borderRadius: "12px",
              padding: "28px",
              marginBottom: "50px",
              boxShadow: "0 2px 8px rgba(61, 44, 46, 0.08)",
              border: "1px solid #f0e8dd",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
              }}
            >
              {/* Search Input */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#8b7d7f",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Find what you're looking for..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "2px solid #e8dfd6",
                    background: "#fefdfb",
                    fontSize: "15px",
                    color: themeColors.text,
                    boxSizing: "border-box",
                    transition: "all 0.3s ease",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = themeColors.primaryButton;
                    e.target.style.boxShadow = "0 0 0 3px rgba(201, 123, 99, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8dfd6";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Category Select */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#8b7d7f",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "2px solid #e8dfd6",
                    background: "#fefdfb",
                    fontSize: "15px",
                    color: themeColors.text,
                    boxSizing: "border-box",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = themeColors.primaryButton;
                    e.target.style.boxShadow = "0 0 0 3px rgba(201, 123, 99, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8dfd6";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="">All Categories</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothes">Clothes</option>
                  <option value="furniture">Furniture</option>
                  <option value="books">Books</option>
                  <option value="sports">Sports</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Sort Select */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#8b7d7f",
                    marginBottom: "8px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  Sort By
                </label>
                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: "8px",
                    border: "2px solid #e8dfd6",
                    background: "#fefdfb",
                    fontSize: "15px",
                    color: themeColors.text,
                    boxSizing: "border-box",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = themeColors.primaryButton;
                    e.target.style.boxShadow = "0 0 0 3px rgba(201, 123, 99, 0.1)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#e8dfd6";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <option value="">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="low">Price: Low to High</option>
                  <option value="high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
                marginBottom: "50px",
              }}
            >
              {products.map((product) => (
                <div
                  key={product._id}
                  style={{
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                marginTop: "50px",
              }}
            >
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                style={{
                  padding: "11px 24px",
                  borderRadius: "8px",
                  border: "2px solid #e8dfd6",
                  background: page === 1 ? "#f0e8dd" : themeColors.cardBackground,
                  color: page === 1 ? "#c9c0b7" : themeColors.primaryButton,
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (page !== 1) {
                    e.target.style.background = themeColors.primaryButton;
                    e.target.style.color = themeColors.cardBackground;
                    e.target.style.borderColor = themeColors.primaryButton;
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = themeColors.cardBackground;
                  e.target.style.color = themeColors.primaryButton;
                  e.target.style.borderColor = "#e8dfd6";
                }}
              >
                Previous
              </button>

              <span
                style={{
                  padding: "10px 18px",
                  background: themeColors.navBar,
                  borderRadius: "8px",
                  fontWeight: "700",
                  color: themeColors.text,
                  fontSize: "15px",
                }}
              >
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                style={{
                  padding: "11px 24px",
                  borderRadius: "8px",
                  border: "2px solid #e8dfd6",
                  background: page === totalPages ? "#f0e8dd" : themeColors.cardBackground,
                  color: page === totalPages ? "#c9c0b7" : themeColors.primaryButton,
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (page !== totalPages) {
                    e.target.style.background = themeColors.primaryButton;
                    e.target.style.color = themeColors.cardBackground;
                    e.target.style.borderColor = themeColors.primaryButton;
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = themeColors.cardBackground;
                  e.target.style.color = themeColors.primaryButton;
                  e.target.style.borderColor = "#e8dfd6";
                }}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div
            style={{
              background: themeColors.cardBackground,
              borderRadius: "12px",
              padding: "80px 40px",
              textAlign: "center",
              border: "2px solid #e8dfd6",
            }}
          >
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: themeColors.text,
                margin: "0 0 12px 0",
              }}
            >
              No Products Found
            </h2>
            <p
              style={{
                fontSize: "16px",
                color: "#8b7d7f",
                margin: "0",
                lineHeight: "1.6",
              }}
            >
              We couldn't find any items matching your search. Try adjusting your filters or check back soon for new sustainable treasures.
            </p>
          </div>
        )}
      </div>

      <footer
        style={{
          borderTop: `1px solid ${themeColors.navBar}`,
          background: themeColors.background,
          padding: "40px 24px 30px",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "32px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: "1 1 260px", minWidth: "240px" }}>
            <h3
              style={{
                margin: "0 0 12px 0",
                fontSize: "24px",
                fontWeight: "800",
                color: themeColors.text,
              }}
            >
              THRIFTS
            </h3>
            <p
              style={{
                margin: "0 0 14px 0",
                fontSize: "14px",
                fontWeight: "700",
                color: "#7a6d6f",
                letterSpacing: "0.02em",
              }}
            >
              Reuse • Reduce • Rediscover
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "15px",
                lineHeight: "1.8",
                color: "#8b7d7f",
                maxWidth: "380px",
              }}
            >
              A modern resale marketplace designed to extend product life, reduce waste, and make sustainable shopping effortless.
            </p>
          </div>

          <div style={{ flex: "1 1 180px", minWidth: "180px" }}>
            <h4
              style={{
                margin: "0 0 14px 0",
                fontSize: "16px",
                fontWeight: "800",
                color: themeColors.text,
              }}
            >
              Quick Links
            </h4>
            {[
              { label: "Home", href: "/" },
              { label: "My Listings", href: "/dashboard" },
              { label: "Wishlist", href: "/wishlist" },
              { label: "Sell an Item", href: "/sell" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  display: "block",
                  margin: "0 0 10px 0",
                  color: "#6E5D57",
                  textDecoration: "none",
                  fontSize: "15px",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = themeColors.primaryButton;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#6E5D57";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ flex: "1 1 180px", minWidth: "180px" }}>
            <h4
              style={{
                margin: "0 0 14px 0",
                fontSize: "16px",
                fontWeight: "800",
                color: themeColors.text,
              }}
            >
              Connect
            </h4>
            {[
              { label: "Instagram", href: "https://www.instagram.com/shivanii_.017/?next=%2F&hl=en" },
              { label: "LinkedIn", href: "https://www.linkedin.com/in/shivani-m-760280261/" },
              { label: "GitHub", href: "https://github.com/Shivani367" },
              { label: "Email", href: "m.shivaniii017@gmail.com" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  margin: "0 0 10px 0",
                  color: "#6E5D57",
                  textDecoration: "none",
                  fontSize: "15px",
                  transition: "color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = themeColors.primaryButton;
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#6E5D57";
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: `1px solid ${themeColors.navBar}`,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "12px",
            color: "#8b7d7f",
            fontSize: "14px",
          }}
        >
          <span style={{ margin: 0 }}>
            © 2026 THRIFTS. All rights reserved.
          </span>
          <span style={{ margin: 0 }}>
            Built for mindful reuse and thoughtful consumer choices.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Home;