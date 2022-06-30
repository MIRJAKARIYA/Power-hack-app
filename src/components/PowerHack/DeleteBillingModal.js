import React from "react";

const DeleteBillingModal = ({ deleteId, setDeleteId, reload, setReload }) => {


  const handleDelete = () =>{
    const userCredential = JSON.parse(localStorage.getItem("UserCredential"));
    const jwtToken = userCredential?.token;
    fetch(`http://localhost:5000/update-billing/${deleteId}`,{
      method:"DELETE",
      headers:{
        authorization: `Bearer ${jwtToken}`
      }
    })
    .then(res => res.json())
    .then(data=>{
      console.log(data)
      setDeleteId("")
      setReload(!reload)
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
