import React from 'react';

const Header = ({totalPaid}) => {
    return (
        <div className='bg-accent max-w-[1400px] mx-auto p-4 flex'>
            <div className='flex-1 pl-10 text-xl font-semibold text-white'>Logo</div>
            <div className='flex-1 text-right pr-10 text-xl font-semibold text-white'>Total paid: </div>
        </div>
    );
};

export default Header;