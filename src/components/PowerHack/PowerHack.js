import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllBilling from "./AllBilling";
import Header from "./Header";

const PowerHack = () => {

  const navigate = useNavigate();
  const [logout, setLogout] = useState(false)

  useEffect(() => {
    const userCredential = JSON.parse(localStorage.getItem("UserCredential"));
    const email = userCredential?.email;
    const jwtToken = userCredential?.token;

    fetch(`http://localhost:5000/isValidUser?email=${email}`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${jwtToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({message:'Token send'}),
    })
    .then(res => res.json())
    .then(data => {
      if(!(data.authorization)){
        localStorage.removeItem("UserCredential")
        navigate('/login')
      }
    })
  }, [navigate, logout]);


  const handleLogout = () =>{
    localStorage.removeItem("UserCredential")
    setLogout(true)
  }

  return (
    <div>
      <Header></Header>
      <AllBilling></AllBilling>
      
    </div>
  );
};

export default PowerHack;
