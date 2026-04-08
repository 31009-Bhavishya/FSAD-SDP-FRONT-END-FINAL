import React from "react";
import "./Admin.css";

const Orders = () => {
  const orders = JSON.parse(localStorage.getItem("pharmacyOrders")) || JSON.parse(localStorage.getItem("cart")) || [];

  return (
    <div className="admin-page">
      <h1>Orders</h1>

      <div className="admin-section">
        <h2>Order History</h2>

        {orders.length === 0 ? (
          <p className="admin-empty">No orders found</p>
        ) : (
          orders.map((o, i) => (
            <div className="admin-row" key={i}>
              <span>
                {o.name || o.medicine} × {o.quantity || 1}
              </span>

              <span>₹{o.price ? o.price * (o.quantity || 1) : "Tracked"}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;
