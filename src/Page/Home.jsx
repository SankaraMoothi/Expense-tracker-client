import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [logIn, setLogIn] = useState(false);
  const [transaction, setTransaction] = useState([]);
  const [datetime, setDatetime] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const checkUser = () => {
    const users = window.localStorage.getItem("username");
    const token = window.localStorage.getItem("token");
    if (users === null) {
      navigate("/login");
    } else {
      setLogIn(!logIn);
      const data = {
        username: users,
        token: token,
      };

      if (data == null || data === undefined) {
        navigate("/login");
      } else {
        fetch("https://expense-tracker-backend-three.vercel.app/user/expense", {
          method: "GET",
          headers: {
            "x-auth-token": `${data.token}`,
            "Access-Control-Allow-Origin": "*",
            username: `${data.username}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setTransaction(data);
          });
      }
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = window.localStorage.getItem("username");
    const token = window.localStorage.getItem("token");
    const price = name.split(" ")[0];

    const data = {
      price,
      name: name.substring(price.length + 1),
      datetime,
      description,
    };

    if (data == null || data === undefined) {
      navigate("/login");
    } else {
      await fetch(
        "https://expense-tracker-backend-three.vercel.app/user/create",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "x-auth-token": `${token}`,
            username: `${username}`,
            "Content-Type": "application/json",
            accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          checkUser();
        });
    }
  };
  let balance = 0;
  for (const transactions of transaction) {
    balance = balance + Number(transactions.price);
  }
  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <h1 className={balance < 0 ? "home red" : "home green"}>
        <span className="Home">
          {balance < 0 ? "Debt To Pay :" : "Balance :"}
        </span>
        ${balance}
        <span>.00</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="basic">
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder={"+200 new samsung tv"}
            required
          />
          <input
            name="datetime"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            type="datetime-local"
            required
          />
        </div>

        <div className="description">
          <input
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder={"description"}
            required
          />
        </div>
        <button type="submit">Add New Transaction</button>
        <button onClick={handleLogout}>LogOut</button>
      </form>
      <div className="transactions">
        {[...transaction]?.reverse().map((item) => (
          <div className="transaction" key={item.datetime}>
            <div className="left">
              <div className="name">{item.name}</div>
              <div className="description">{item.description}</div>
            </div>
            <div className="right">
              <div className={item.price < 0 ? "price red" : "price green"}>
                {item.price}
              </div>
              <div className="datetime">{item.datetime}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
