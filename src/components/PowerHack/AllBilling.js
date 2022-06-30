import React, { useEffect, useState } from "react";
import DeleteBillingModal from "./DeleteBillingModal";

import SingleBill from "./SingleBill";

const AllBilling = () => {
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [billingList, setBillingList] = useState([])
  const [reload, setReload] = useState(false)

  useEffect(() => {
    fetch("http://localhost:5000/billing-list")
      .then((res) => res.json())
      .then((data) => setBillingList(data));
  }, [reload]);

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mt-10 rounded-md py-2 px-4 mb-5 bg-gray-300">
          <div className="flex-1 flex items-center gap-8">
            <p className="text-lg font-semibold">Billing</p>
            <div>
              <input
                type="text"
                className="input input-bordered input-error h-[40px] w-[250px]"
                placeholder="Type here"
              />
            </div>
          </div>
          <div className="flex-1 text-right">
            <button className="btn btn-sm bg-orange-500 hover:bg-orange-500 border-0">
              add new bill
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Billing ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Paid Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                billingList.map(bill => <SingleBill
                  bill={bill}
                  setUpdateId={setUpdateId}
                  setDeleteId={setDeleteId}
                ></SingleBill>)
              }

            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <DeleteBillingModal
          reload={reload}
          setReload={setReload}
          deleteId={deleteId}
          setDeleteId={setDeleteId}
        ></DeleteBillingModal>
      )}
    </>
  );
};

export default AllBilling;
