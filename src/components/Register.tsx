import React, { useState } from 'react';

const Register = ({ changeForm }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [reg, setReg] = useState({
    username: '',
    password: '',
  });
  async function submitRegForm(e: any) {
    e.preventDefault();
    console.log(reg);
  }

  function RegInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setReg((data) => ({
      ...data,
      [name]: value,
    }));
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
      <div className='flex flex-col bg-white rounded-lg p-6 shadow-md w-96'>
        <div className='text-center'>
          <button
            className='p-2 m-2 rounded-lg border border-gray-400 text-neutral-600 w-1/2'
            onClick={changeForm}
          >
            Login
          </button>
          <button className='p-2 m-2 rounded-lg bg-blue-500 w-1/2 text-white'>
            Sign Up
          </button>
        </div>
        <form onSubmit={submitRegForm}>
          <input
            type='text'
            className='p-2 w-full border border-gray-400 mb-3 rounded-md focus:outline-none'
            placeholder='Username'
            name='username'
            onChange={RegInput}
            required
          />
          <div className='relative'>
            <input
              type={showPassword ? 'text' : 'password'}
              className='p-2 w-full border border-gray-400 mb-3 rounded-md focus:outline-none'
              placeholder='Password'
              name='password'
              onChange={RegInput}
              required
            />
            <div
              className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <i className='text-gray-500'></i>
              ) : (
                <i className='text-gray-500'></i>
              )}
            </div>
          </div>
          <input
            type='submit'
            value=' Sign Up'
            className='p-2 w-full bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none'
          />
          <div className='flex items-center mt-3'>
            <input
              type='checkbox'
              className='mt-1 mr-2'
              onClick={togglePasswordVisibility}
            />
            <p>Show Password</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
