import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const navigate = useNavigate();

  // Base URL
  const BASE_URL = "https://reqres.in/api";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/login`, { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/users");
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <div className="col-lg-12 col-md-12 col-12" >
      <h1>Login</h1>
      <div className="d-flex justify-content-center"> 
        <div  style={{ width: "25rem" ,boxShadow:'5px 5px 15px rgba(0, 0, 0, 0.3)'}}>
          <form className="p-3">
            <label htmlFor="username" className="form-label">
              <sup style={{ color: "red" }}>*</sup> Email or Username
            </label>
            <input
              type="text"
              className="form-control bg-light"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Username"
              required
            />

            <label htmlFor="password" className="form-label mt-2">
              <sup style={{ color: "red" }}>*</sup> Password
            </label>
            <input
              type="password"
              className="form-control bg-light"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />

            {/* Login Button */}
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handleLogin} type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
