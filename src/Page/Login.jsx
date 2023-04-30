import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username,
      password,
    };
    try {
      const res = await axios.post(
        "https://expense-tracker-backend-three.vercel.app/user/login",
        data
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <h1>Login</h1>
      <form className="login" onSubmit={handleLogin}>
        <input
          value={username}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <Link to={"/register"}>
          <button>Register</button>
        </Link>
      </form>
    </>
  );
};

export default Login;
