import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllBilling from "./AllBilling";
const PowerHack = () => {
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);

  useEffect(() => {
    const cred = localStorage.getItem("UserCredential");
    console.log(cred);
    if (cred) {
      const userCredential = JSON.parse(cred);
      const email = userCredential?.email;
      const jwtToken = userCredential?.token;

      fetch(`http://localhost:5000/api/isValidUser?email=${email}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${jwtToken}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({ message: "Token send" }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.authorization) {
            localStorage.removeItem("UserCredential");
            navigate("/login");
          }
        });
    } else {
      localStorage.removeItem("UserCredential");
      navigate("/login");
    }
  }, [navigate, logout]);

  const handleLogout = () => {
    localStorage.removeItem("UserCredential");
    setLogout(true);
  };

  return (
    <div>
      <AllBilling handleLogout={handleLogout}></AllBilling>
    </div>
  );
};

export default PowerHack;
