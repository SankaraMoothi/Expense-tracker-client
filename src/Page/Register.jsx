import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Conpass, setConpass] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === Conpass) {
      const data = {
        username: name,
        email,
        password,
      };
      if (data == null || data === undefined) {
        navigate("/login");
      } else {
        await fetch(
          "https://expense-tracker-backend-three.vercel.app/user/register",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            navigate("/login");
          });
      }
    } else {
      alert("Something Want Worng...");
    }
  };
  return (
    <>
      <h1>Register</h1>
      <form className="register" onSubmit={handleRegister}>
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="username"
        />
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="userEmail"
        />
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="password"
        />
        <input
          value={Conpass}
          onChange={(e) => {
            setConpass(e.target.value);
          }}
          type="password"
          placeholder="canform password"
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
