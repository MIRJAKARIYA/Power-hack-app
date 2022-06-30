import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setEmailError("");
          setPasswordError("");
          localStorage.setItem('UserCredential', JSON.stringify({email,token:data.token}))
          navigate("/");
        } else {
          if (data.mgs.includes("email")) {
            setPasswordError("");
            setEmailError(data.mgs);
          } else {
            setEmailError("");
            setPasswordError(data.mgs);
          }
        }
      });
  };

  return (
    <>
      <div className="flow-root my-10">
        <div className="card mx-auto flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email")}
                  required
                />
              </div>
              <small className="text-red-700">{emailError} </small>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  {...register("password")}
                  required
                />
                <p
                  onClick={() => setIsVisible(!isVisible)}
                  style={{ cursor: "pointer" }}
                  className="absolute text-xl top-[60%] left-[90%]"
                >
                  {isVisible ? <AiFillEye /> : <AiFillEyeInvisible />}
                </p>
              </div>
              <small className="text-red-700">{passwordError}</small>
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
        <p className="block text-center mt-3 underline text-blue-700">
          <Link to="/register">create a new account...</Link>
        </p>
      </div>
    </>
  );
};

export default Login;
