import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../hooks/Auth';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';
import Nav from '../components/Nav';
import { io } from 'socket.io-client';
const Chat = () => {
  Auth();
  const [userText, setUserText] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [clientUsername, setClientUsername] = useState('');
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });
  const socket = io('http://localhost:4001', {
    withCredentials: true,
    extraHeaders: {
      'my-custom-header': 'abcd',
    },
  });
  socket.on('connect', () => {
    console.log(`well done you have connected ${socket.id}`);
  });
  socket.on('recieve-message', (message) => {
    setUserText((data) => [...data, message]);
  });

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    socket.emit('send-message', inputValue);
    setUserText((data) => [...data, inputValue]);
    console.log((data: any) => [...data, inputValue]);
    setInputValue('');
    console.log(inputValue);
  }

  function loginInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setInputValue(value);
  }

  function logOut() {
    Cookies.remove('UserjwtToken');
    navigate('/');
  }
  const usernameJWT = () => {
    const getJWT = Cookies.get('UserjwtToken');
    if (getJWT) {
      const decodedTokenUsername = (decodeToken(getJWT) as { username: string })
        .username;
      setClientUsername(decodedTokenUsername);
    } else return;
  };
  const deleteAccount = async () => {
    try {
      await instance.post('/user/delete-user', { username: clientUsername });
      logOut();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    usernameJWT();
  }, []);

  return (
    <div className='h-screen bg-slate-900'>
      <Nav
        clientUsername={clientUsername}
        logOut={logOut}
        deleteAccount={deleteAccount}
      />
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl text-white font-mono pt-10'>Chat App</h1>
      </div>
      <div className='border border-white rounded-lg mt-10'>
        <h2 className='text-center text-white'>Chat log</h2>
        <ul>
          {userText.map((text, index) => (
            <li
              key={index}
              className='text-white text-end p-5 border border-white'
            >
              {text}
            </li>
          ))}
        </ul>
        <form
          onSubmit={submitForm}
          className='border border-green-600 rounded-lg flex'
        >
          <input
            type='text'
            value={inputValue}
            onChange={loginInput}
            placeholder='Type Message...'
            className='border border-white p-2 rounded-xl flex-grow'
          />
          <input
            type='submit'
            value='Submit'
            className='border border-white text-white p-2 rounded-xl'
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
