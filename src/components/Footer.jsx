import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{
      background: "#0f172a",
      color: "#94a3b8",
      padding: "40px 20px 20px",
      marginTop: "auto",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "30px",
        marginBottom: "30px",
      }}>
        <div>
          <h3 style={{ color: "#fff", marginBottom: "12px", fontSize: "18px" }}>MediCurex</h3>
          <p style={{ fontSize: "13px", lineHeight: "1.7" }}>
            A digital healthcare platform connecting patients, doctors, pharmacists, and administrators.
          </p>
        </div>
        <div>
          <h4 style={{ color: "#fff", marginBottom: "12px" }}>Quick Links</h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {[
              { to: "/", label: "Home" },
              { to: "/services", label: "Services" },
              { to: "/medicine", label: "Medicine" },
              { to: "/login", label: "Login" },
              { to: "/register", label: "Register" },
            ].map(({ to, label }) => (
              <li key={to} style={{ marginBottom: "6px" }}>
                <Link to={to} style={{ color: "#94a3b8", textDecoration: "none", fontSize: "13px" }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: "#fff", marginBottom: "12px" }}>Contact</h4>
          <p style={{ fontSize: "13px", lineHeight: "1.8" }}>
            📧 support@medicurex.com<br />
            📞 +91 98765 43210<br />
            📍 Hyderabad, Telangana, India
          </p>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1e293b", paddingTop: "16px", textAlign: "center", fontSize: "13px" }}>
        &copy; 2026 MediCurex. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
