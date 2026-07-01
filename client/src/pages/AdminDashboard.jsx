import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await api.get(
          "/admin/stats",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setStats(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return <h2>Loading...</h2>;
  }

 return (
  <div
    style={{
      padding: "40px",
    }}
  >
    <h1
      style={{
        marginBottom: "30px",
      }}
    >
      Admin Dashboard
    </h1>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "20px",
      }}
    >
      <div
        style={{
          background: "#FFFDF9",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #EADBC8",
        }}
      >
        <h3>Total Users</h3>
        <h1>{stats.totalUsers}</h1>
      </div>

      <div
        style={{
          background: "#FFFDF9",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #EADBC8",
        }}
      >
        <h3>Total Products</h3>
        <h1>{stats.totalProducts}</h1>
      </div>

      <div
        style={{
          background: "#FFFDF9",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #EADBC8",
        }}
      >
        <h3>Sold Products</h3>
        <h1>{stats.soldProducts}</h1>
      </div>

      <div
        style={{
          background: "#FFFDF9",
          padding: "25px",
          borderRadius: "16px",
          border: "1px solid #EADBC8",
        }}
      >
        <h3>Available Products</h3>
        <h1>{stats.availableProducts}</h1>
      </div>
    </div>
  </div>
);
}

export default AdminDashboard;