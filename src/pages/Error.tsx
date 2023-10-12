import React from 'react';
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className='h-screen bg-neutral-300 flex flex-col justify-center items-center'>
      <h1 className='text-black font-bold text-8xl'>OOPS</h1>
      <p className='font-bold mt-3 mb-3 text-2xl'>404 - PAGE NOT FOUND</p>
      <p>
        The page you are looking for has been removed, had its name changed, or
        is temporarily unavailable.
      </p>
      <button
        onClick={() => navigate('/')}
        className='border border-neutral-950 p-2 rounded-2xl mt-3 bg-neutral-950 text-white font-bold'
      >
        Back to Login Page
      </button>
    </div>
  );
};

export default Error;
