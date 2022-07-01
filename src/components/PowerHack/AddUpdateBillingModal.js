import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUpdateBillingModal = ({
  api,
  setReload,
  reload,
  updateId,
  setUpdateId,
  addUpModal,
  setAddUpModal,
  billingList,
  setBillingList,
}) => {
  const navigate = useNavigate();
  //value states
  const [fname, setFName] = useState(updateId.FullName);
  const [email, setEmail] = useState(updateId.Email);
  const [phone, setPhone] = useState(updateId.Phone);
  const [payAm, setPayAm] = useState(updateId.PaidAmount);

  //error states
  const [nameErr, setNameErr] = useState("* Full Name is required");
  const [emailErr, setEmailErr] = useState("* Email is required");
  const [phoneErr, setPhoneErr] = useState("* Phone Number is required");
  const [amountErr, setAmountErr] = useState("* Paid Amout is required");
  useEffect(() => {
    if (updateId.FullName) {
      setNameErr("");
      setEmailErr("");
      setPhoneErr("");
      setAmountErr("");
    }
  }, [updateId]);
  const handleSubmit = (e) => {
    e.preventDefault();

    const userCredential = JSON.parse(localStorage.getItem("UserCredential"));
    const jwtToken = userCredential?.token;

    if (!nameErr && !emailErr && !phoneErr && !amountErr) {
      if (updateId === "add-Bill") {
        setBillingList([
          ...billingList,
          {
            FullName: fname,
            Email: email,
            Phone: phone,
            PaidAmount: payAm,
            _id: "",
          },
        ]);
        fetch("https://hydro-moose-53627.herokuapp.com/api/add-billing", {
          method: "POST",
          headers: {
            authorization: `Bearer ${jwtToken}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            FullName: fname,
            Email: email,
            Phone: phone,
            PaidAmount: payAm,
          }),
        })
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              localStorage.removeItem("UserCredential");
              navigate("/login");
            }
            return res.json();
          })
          .then((data) => {
            if (data.acknowledged) {
              setReload(!reload);
              setAddUpModal(!addUpModal);
            }
          });
      } else {
        fetch(
          `https://hydro-moose-53627.herokuapp.com/api/update-billing/${updateId._id}`,
          {
            method: "PUT",
            headers: {
              authorization: `Bearer ${jwtToken}`,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              FullName: fname,
              Email: email,
              Phone: phone,
              PaidAmount: payAm,
            }),
          }
        )
          .then((res) => {
            if (res.status === 401 || res.status === 403) {
              localStorage.removeItem("UserCredential");
              navigate("/login");
            }
            return res.json();
          })
          .then((data) => {
            if (data.acknowledged) {
              setAddUpModal(!addUpModal);
              setReload(!reload);
            }
          });
      }
    }
  };

  // error handling
  const handleName = (e) => {
    setNameErr("");
    setFName(e.target.value);
    if (e.target.value === "") {
      setNameErr("* Full Name is required");
    }
  };

  const handleEmail = (e) => {
    setEmailErr("");
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailErr("* Email is required");
    }
  };

  const handlePhone = (e) => {
    setPhoneErr("");
    setPhone(e.target.value);
    if (e.target.value === "") {
      setPhoneErr("* Phone Number is required");
    } else if (e.target.value.length > 11 || e.target.value.length < 11) {
      setPhoneErr("* Phone Number must be 11 digits");
    }
  };

  const handleAmount = (e) => {
    setAmountErr("");
    setPayAm(e.target.value);
    if (e.target.value === "") {
      setAmountErr("* Paid Amout is required");
    }
  };

  return (
    <>
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-open sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-center text-lg mb-3">
            {updateId === "add-Bill" ? "Add New Bill" : "Edit The Bill"}
          </h3>
          <div className="">
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Full Name"
                class="input input-bordered input-primary w-full mb-2"
                value={fname || ""}
                onChange={handleName}
              />
              <p className="text-xs font-semibold text-red-700 mb-2">
                {nameErr}
              </p>

              <input
                type="email"
                placeholder="Enter Email"
                class="input input-bordered input-primary w-full mb-2"
                value={email}
                onChange={handleEmail}
              />
              <p className="text-xs font-semibold text-red-700 mb-2">
                {emailErr}
              </p>
              <input
                type="number"
                placeholder="Enter Phone Number"
                class="input input-bordered input-primary w-full mb-2"
                value={phone}
                onChange={handlePhone}
              />
              <p className="text-xs font-semibold text-red-700 mb-2">
                {phoneErr}
              </p>
              <input
                type="number"
                placeholder="Enter Paid Amount"
                class="input input-bordered input-primary w-full mb-1"
                value={payAm}
                onChange={handleAmount}
              />
              <p className="text-xs font-semibold text-red-700 mb-2">
                {amountErr}
              </p>
              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  {updateId === "add-Bill" ? "Add" : "Update"}
                </button>
                <button
                  onClick={() => setAddUpModal(!addUpModal)}
                  className="btn btn-error"
                >
                  cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdateBillingModal;
