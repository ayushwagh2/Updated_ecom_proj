import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", data);

      localStorage.setItem("token", res.data.token);  

      navigate("/dashboard");  
    } catch (err) {
      alert("Invalid Login!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>

      <input placeholder="username"
        onChange={(e) => setData({ ...data, username: e.target.value })}
      /> <br />

      <input placeholder="Password" type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      /> <br />
      
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
