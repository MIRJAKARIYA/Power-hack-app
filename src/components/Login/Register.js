import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineWarning,
} from "react-icons/ai";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [passError, setPassError] = useState(false);
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const passRef = useRef();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const name = data.name;
    const password = passRef.current.value;
    setPassError(false);
    setConfirmPassError(false);
    
  };
  return (
    <>
      <div className="my-10">
        <div className="">
          <div>
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100 mx-auto">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Your Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Name"
                      className="input input-bordered"
                      {...register("name")}
                      required
                    />
                  </div>
                  {errors.name?.type === "required" && (
                    <div className="ml-2 text-xs flex items-center text-red-700 font-semibold">
                      <AiOutlineWarning />{" "}
                      <span className="ml-1">{errors.name.message}</span>
                    </div>
                  )}
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
                  {errors.email?.type === "required" && (
                    <div className="ml-2 text-xs flex items-center text-red-700 font-semibold">
                      <AiOutlineWarning />{" "}
                      <span className="ml-1">{errors.email.message}</span>
                    </div>
                  )}
                  <div className="form-control relative">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type={isVisible ? "text" : "password"}
                      placeholder="password"
                      className="input input-bordered"
                      ref={passRef}
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
                  {passError && (
                    <div className="ml-2 text-xs flex items-center text-red-700 font-semibold">
                      <AiOutlineWarning />{" "}
                      <span className="ml-1">Password is not valid</span>
                    </div>
                  )}

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type={isVisible ? "text" : "password"}
                      placeholder="confirm password"
                      className="input input-bordered"
                      {...register("confirmPassword")}
                      required
                    />
                  </div>
                  {confirmPassError && (
                    <div className="ml-2 text-xs flex items-center text-red-700 font-semibold">
                      <AiOutlineWarning />{" "}
                      <span className="ml-1">Password didn't match</span>
                    </div>
                  )}

                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </form>

            </div>
            <p className="text-center underline text-blue-700 mt-3">
              <Link to="/">already have an account?</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
