import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Conpass, setConpass] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    if (password === Conpass) {
      const data = {
        name,
        email,
        password,
      };
      console.log(data);
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
