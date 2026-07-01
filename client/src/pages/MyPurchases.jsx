import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function MyPurchases() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/orders/my-purchases", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="purchases-page">
      <div className="container">
        <header className="purchases-header">
          <div>
            <h1 className="page-title">My Purchases</h1>
            <p className="page-sub">Products you've given a second life.</p>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-card">
              <h2>You haven't purchased anything yet.</h2>
              <p className="muted">Discover unique pre-loved items from the community.</p>
              <Link to="/" className="btn-primary">Browse Products</Link>
            </div>
          </div>
        ) : (
          <section className="purchases-grid" aria-live="polite">
            {orders.map((order) => {
              const product = order.product || {};
              const status = (order.status || "paid").toLowerCase();
              return (
                <article className="purchase-card" key={order._id}>
                  <div className="image-wrap">
                    <img
                      src={product.images?.[0]}
                      alt={product.title}
                      className="purchase-image"
                    />
                  </div>

                  <div className="card-content">
                    <h3 className="product-title">{product.title}</h3>

                    <div className="meta-row">
                      <div className="amount">Paid: <span className="amount-value">₹{order.amount}</span></div>
                      <div className={`badge ${status === "paid" ? "badge--paid" : "badge--pending"}`}>
                        {status === "paid" ? "Paid" : "Pending"}
                      </div>
                    </div>

                    <div className="meta-row small muted">Purchased: {new Date(order.createdAt).toLocaleDateString()}</div>

                    <div className="card-actions">
                      <Link to={`/products/${product._id}`} className="btn-outline">View Product</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </div>
    </div>
  );
}

export default MyPurchases;