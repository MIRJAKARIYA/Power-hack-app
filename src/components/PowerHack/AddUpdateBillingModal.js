import React from "react";

const AddUpdateBillingModal = () => {
  return (
    <>
      <input type="checkbox" id="my-modal-7" className="modal-toggle" />
      <div className="modal modal-open modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div className="modal-action">
            <button className="btn">Delete</button>
            <button className="btn">cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUpdateBillingModal;
