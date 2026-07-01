import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  const getUserRole = () => {
    if (!token) return null;
    try {
      const payload = token.split(".")[1];
      if (!payload) return null;
      const decoded = JSON.parse(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
      return decoded?.role || null;
    } catch {
      return null;
    }
  };

  const userRole = getUserRole();
  const isAdmin = userRole === "admin";

  const activeLinkStyle = (path) => ({
    color: location.pathname === path ? "#3D2C2E" : "#5f4d45",
    borderBottom: location.pathname === path ? "2px solid #3D2C2E" : "2px solid transparent",
    paddingBottom: "6px",
    transition: "all 0.2s ease",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        background: "#EADBC8",
        padding: "18px 28px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "16px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 10px 30px rgba(61, 44, 46, 0.12)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          flexShrink: 0,
          minWidth: "160px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#3D2C2E",
            fontWeight: "800",
            fontSize: "28px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          THRIFTS
        </Link>
        <span
          style={{
            color: "#5f4d45",
            fontSize: "10px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: "550",
          }}
        >
          Reuse • Reduce • Rediscover
        </span>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "22px",
          alignItems: "center",
          flex: "1 1 280px",
          justifyContent: "center",
          minWidth: "220px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontWeight: "600",
            ...activeLinkStyle("/"),
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#3D2C2E";
          }}
          onMouseLeave={(e) => {
            if (location.pathname !== "/") e.target.style.color = "#5f4d45";
          }}
        >
          Home
        </Link>

        <Link
          to="/wishlist"
          style={{
            textDecoration: "none",
            fontWeight: "600",
            ...activeLinkStyle("/wishlist"),
          }}
          onMouseEnter={(e) => {
            e.target.style.color = "#3D2C2E";
          }}
          onMouseLeave={(e) => {
            if (location.pathname !== "/wishlist") e.target.style.color = "#5f4d45";
          }}
        >
          Wishlist
        </Link>
        

        {token && (
          <Link
            to="/dashboard"
            style={{
              textDecoration: "none",
              fontWeight: "600",
              ...activeLinkStyle("/dashboard"),
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#3D2C2E";
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== "/dashboard") e.target.style.color = "#5f4d45";
            }}
          >
            My Listings
          </Link>
        )}

        {isAdmin && (
          <Link
            to="/admin"
            style={{
              textDecoration: "none",
              fontWeight: "600",
              ...activeLinkStyle("/admin"),
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#3D2C2E";
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== "/admin") e.target.style.color = "#5f4d45";
            }}
          >
            Admin
          </Link>
          
        )}
      </div>


      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          alignItems: "center",
          justifyContent: "flex-end",
          flex: "1 1 260px",
          minWidth: "220px",
        }}
      >
        {token ? (
          <>
            <Link
              to="/sell"
              style={{
                textDecoration: "none",
                fontWeight: "600",
                color: "#3D2C2E",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#3D2C2E";
              }}
              onMouseLeave={(e) => {
                if (location.pathname !== "/sell") e.target.style.color = "#3D2C2E";
              }}
            >
              Sell an Item
            </Link>
              <Link to="/my-purchases"
              style={{
                textDecoration: "none",
                fontWeight: "600",
                color: "#3D2C2E",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#3D2C2E";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#3D2C2E";
              }}>
                My Purchases
            </Link>
            <Link
              to="/profile"
              style={{
                textDecoration: "none",
                fontWeight: "600",
                color: "#3D2C2E",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#3D2C2E";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#3D2C2E";
              }}
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              style={{
                background: "#C97B63",
                color: "#FFFDF9",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "700",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#b36a52";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#C97B63";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                fontWeight: "600",
                color: "#3D2C2E",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#3D2C2E";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#3D2C2E";
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                textDecoration: "none",
                fontWeight: "600",
                color: "#3D2C2E",
              }}
              onMouseEnter={(e) => {
                e.target.style.color = "#3D2C2E";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#3D2C2E";
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;