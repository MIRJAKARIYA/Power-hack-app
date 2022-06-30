import React from "react";

const SingleBill = ({bill, setUpdateId, setDeleteId }) => {
  const {_id, FullName, Email, Phone, PaidAmount} = bill;
  console.log(_id, FullName, Email, Phone, PaidAmount)
  return (
    <tr className="hover">
      <td>{_id}</td>
      <td>{FullName}</td>
      <td>{Email}</td>
      <td>{Phone}</td>
      <td>{PaidAmount}</td>
      <td>
        <button
          onClick={() => setUpdateId("hello")}
          className="btn btn-accent btn-xs"
        >
          add
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
