import React from "react";
import { useNavigate } from "react-router-dom";

const Portal = () => {
  const navigate = useNavigate();
  const handleShow = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <>
      <h1>Hai Welcome To Expense Tracker</h1>
      <button className="portalbutton" onClick={handleShow}>
        Show Me
      </button>
    </>
  );
};

export default Portal;
