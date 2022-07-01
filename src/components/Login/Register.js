import React, { useState } from "react";
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
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false);

  const [existsError, setExistsError] = useState('');


  const onSubmit = async (data) => {
    const name = data.name;
    const email = data.email
    const password = data.password;


    fetch('http://localhost:5000/api/registration',{
      method:'POST',
      headers:{
        "content-type": "application/json",
      },
      body: JSON.stringify({name, email,password}),
    })
    .then(res => res.json())
    .then(data => {
      if(data.acknowledged){
        setExistsError('')
        navigate('/login')
      }
      else{
        setExistsError('*'+data.mgs)
      }
    })


    
  };
  return (
    <>
    <h1 className="mt-20 text-xl font-semibold text-center text-primary">Create new account if you don't have one.</h1>
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
                    <p className="text-xs text-red-700"> {existsError}</p>
                  </div>
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

                  <div className="form-control mt-6">
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </form>

            </div>
            <p className="text-center underline text-blue-700 mt-3">
              <Link to="/login">already have an account?</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
