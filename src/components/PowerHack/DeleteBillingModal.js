import React from "react";
import { useNavigate } from "react-router-dom";
const DeleteBillingModal = ({ deleteId, setDeleteId, reload, setReload }) => {

  const navigate = useNavigate();
  const handleDelete = () =>{
    const userCredential = JSON.parse(localStorage.getItem("UserCredential"));
    const jwtToken = userCredential?.token;
    fetch(`http://localhost:5000/api/update-billing/${deleteId}`,{
      method:"DELETE",
      headers:{
        authorization: `Bearer ${jwtToken}`
      }
    })
    .then(res => {
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("UserCredential");
        navigate("/login");
      }
      return res.json();
    })
    .then(data=>{
        if(data.acknowledged){
          setDeleteId("")
          setReload(!reload)
        }
    })
  }
  return (
    <>
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-open modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
          Are you sure you want to delete the bill?
          </h3>
          <p className="py-4">
            
          </p>
          <div className="modal-action">
            <button onClick={handleDelete} className="btn">Delete</button>
            <button onClick={() => setDeleteId("")} className="btn">
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteBillingModal;
