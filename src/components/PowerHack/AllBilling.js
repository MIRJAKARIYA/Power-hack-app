import React, { useEffect, useState } from "react";
import AddUpdateBillingModal from "./AddUpdateBillingModal";
import DeleteBillingModal from "./DeleteBillingModal";
import Header from "./Header";

import SingleBill from "./SingleBill";

const AllBilling = () => {
  const [updateId, setUpdateId] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [billingList, setBillingList] = useState([]);
  const [reload, setReload] = useState(false);
  const [addUpModal, setAddUpModal] = useState(false);
  const [api, setApi] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/api/billing-list")
      .then((res) => res.json())
      .then((data) => setBillingList(data));
  }, [reload]);


  const handleAddNewBill = () =>{
    setAddUpModal(!addUpModal)
    setUpdateId('add-Bill')
    setApi('')
  }

  return (
    <>
    <Header billingList={billingList}></Header>
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
            <button onClick={handleAddNewBill} className="btn btn-sm bg-orange-500 hover:bg-orange-500 border-0">
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
              {billingList.map((bill) => (
                <SingleBill
                  bill={bill}
                  setUpdateId={setUpdateId}
                  setDeleteId={setDeleteId}
                  addUpModal={addUpModal}
                  setAddUpModal={setAddUpModal}
                ></SingleBill>
              ))}
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

      {addUpModal && (
        <AddUpdateBillingModal billingList={billingList} setBillingList={setBillingList} setReload={setReload} reload={reload} updateId={updateId} setUpdateId={setUpdateId} addUpModal={addUpModal} setAddUpModal={setAddUpModal}></AddUpdateBillingModal>
      )}
    </>
  );
};

export default AllBilling;
