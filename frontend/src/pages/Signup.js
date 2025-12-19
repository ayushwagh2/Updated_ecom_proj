import React, { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const handleSignup = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/signup", data);
      alert("Signup successful!");
    } catch (err) {
      alert("Signup failed!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Signup</h2>
      
      <input placeholder="Name" 
        onChange={(e) => setData({ ...data, name: e.target.value })}
      /> <br />

      <input placeholder="Email" 
        onChange={(e) => setData({ ...data, email: e.target.value })}
      /> <br />

      <input placeholder="Password" type="password"
        onChange={(e) => setData({ ...data, password: e.target.value })}
      /> <br />
      
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}
