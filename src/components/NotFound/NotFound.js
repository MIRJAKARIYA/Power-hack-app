import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className='h-screen flex justify-center gap-4 items-center flex-col'>
            <h1 className='text-4xl'>404 page not found😕</h1>
            <button className='btn btn-error btn-xs' onClick={()=>navigate('/')}>Back to Home</button>
        </div>
    );
};

export default NotFound;