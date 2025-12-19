import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome to Dashboard 🎉</h2>
      <button onClick={() => navigate("/products")}>View Products</button>
    </div>
  );
}
