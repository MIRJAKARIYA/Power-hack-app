import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import { useForm } from "react-hook-form";


const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const emailRef = useRef();

  let location = useLocation();


  const [isVisible, setIsVisible] = useState(false);



  const onSubmit = (data) => {
    const email = emailRef.current.value;
    const password = data.password;

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
                  ref={emailRef}
                  required
                />
              </div>
              <small className="text-red-700">
                {/* {error?.message?.includes("not-found") ? "*user not found" : ""} */}
              </small>
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
              <small className="text-red-700">
                {/* {error?.message?.includes("password") ? "*wrong password" : ""} */}
              </small>
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
