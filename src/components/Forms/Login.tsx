import axios from 'axios';
import React, { useState } from 'react';
const { VITE_API_URL } = import.meta.env;
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import FormModal from './FormModal/FormModal';

const Login = ({ changeForm }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({
    username: '',
    password: '',
  });
  const [modal, setModal] = useState(false);
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const navigate = useNavigate();
  async function submitRegForm(e: any) {
    e.preventDefault();
    console.log(login);
    const res = await instance.post('/user/login-user', {
      username: login.username,
      clientpassword: login.password,
    });
    Cookies.set('UserjwtToken', res.data.token);
    setModal(res.data.message);

    setTimeout(() => {
      setModal(false);
    }, 2000);

    if (res.data.message === 'Correct Details') {
      setTimeout(() => {
        navigate('/chat');
      }, 3000);
    } else return;
  }

  function RegInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLogin((data) => ({
      ...data,
      [name]: value,
    }));
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='bg-gray-100 h-screen flex justify-center items-center'>
      {modal !== false ? <FormModal responseMessage={modal} /> : ''}

      <div className='flex flex-col bg-white rounded-lg p-6 shadow-md w-96'>
        <div className='text-center'>
          <button className='p-2 m-2 rounded-lg w-1/2 bg-blue-500 text-white'>
            Login
          </button>
          <button
            className='p-2 m-2 rounded-lg border border-gray-400 text-neutral-600 w-1/2 '
            onClick={changeForm}
          >
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
            value='Log In'
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

export default Login;
