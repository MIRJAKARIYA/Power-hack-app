import React, { useEffect, useState } from 'react';

const Header = ({billingList, handleLogout}) => {
    const [summation, setSummation] = useState(0)

    useEffect(()=>{
        let sum = 0;
        for(let j = 0;j<billingList.length;j++){
            sum = sum + parseInt(billingList[j].PaidAmount);
        }
        setSummation(sum)
    },[billingList])
    return (
        <div className='bg-accent max-w-[1400px] mx-auto p-4 flex'>
            <div className='flex-1 pl-10 text-xl font-semibold text-white'>Logo</div>
            <div>
                <button className='btn btn-sm' onClick={handleLogout}>Logout</button>
            </div>
            <div className='flex-1 text-right pr-10 text-xl font-semibold text-white'>Total paid: {'$'+summation}</div>
        </div>
    );
};

export default Header;