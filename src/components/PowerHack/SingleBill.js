import React from "react";

const SingleBill = ({bill, setUpdateId, setDeleteId, addUpModal, setAddUpModal }) => {
  const {_id, FullName, Email, Phone, PaidAmount} = bill;
  const handleUpdate = () =>{
    setUpdateId(bill)
    setAddUpModal(!addUpModal)
  }
  return (
    <tr className="hover">
      <td>{_id || "Generating Id..."}</td>
      <td>{FullName}</td>
      <td>{Email}</td>
      <td>{Phone}</td>
      <td>{'$'+PaidAmount}</td>
      <td>
        <button
          className="btn btn-accent btn-xs"
          onClick={handleUpdate}
        >
          edit
        </button>
        <button
          onClick={() => setDeleteId(_id)}
          className="btn btn-error ml-2 btn-xs"
        >
          del
        </button>
      </td>
    </tr>
  );
};

export default SingleBill;
