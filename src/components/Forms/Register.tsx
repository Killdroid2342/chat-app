import React, { useState } from 'react';
import axios from 'axios';
import FormModal from './FormModal/FormModal';
const { VITE_API_URL } = import.meta.env;

const Register = ({ changeForm }: any) => {
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [reg, setReg] = useState({
    username: '',
    password: '',
  });
  const [modal, setModal] = useState(false);
  async function submitRegForm(e: any) {
    e.preventDefault();

    if (reg.password !== confirmedPassword) {
      alert('Passwords do not match');
      return;
    }
    const res = await instance.post('/user/register-user', {
      username: reg.username,
      password: reg.password,
    });
    setModal(res.data.message);

    setTimeout(() => {
      setModal(false);
    }, 2000);

    console.log(res);
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

  function ConfirmPasswordInput(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmedPassword(e.target.value);
  }

  return (
    <>
      <div className='bg-gray-100 h-screen flex flex-col justify-center items-center '>
        {modal !== false ? <FormModal responseMessage={modal} /> : ''}
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
          <form onSubmit={submitRegForm} autoComplete='off'>
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
              <input
                type={showPassword ? 'text' : 'password'}
                className='p-2 w-full border border-gray-400 mb-3 rounded-md focus:outline-none'
                placeholder='Confirm Password'
                name='confirmPassword'
                value={confirmedPassword}
                onChange={ConfirmPasswordInput}
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
    </>
  );
};

export default Register;
