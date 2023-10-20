import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../hooks/Auth';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';
import Nav from '../components/Nav';
import { io, Socket } from 'socket.io-client';

const Chat = () => {
  Auth();
  const [userText, setUserText] = useState<
    Array<{ isSent: boolean; text: string; username: string }>
  >([]);

  const [inputValue, setInputValue] = useState('');
  const [clientUsername, setClientUsername] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: VITE_API_URL,
  });

  useEffect(() => {
    const newSocket = io('http://localhost:4001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log(`well done you have connected ${newSocket.id}`);
    });

    newSocket.on('recieve-message', (message) => {
      if (message.username && message.text) {
        setUserText((data) => [
          ...data,
          { isSent: false, text: message.text, username: message.username },
        ]);
      }
      console.log(message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    if (socket) {
      const newMessage = {
        isSent: true,
        text: inputValue,
        username: clientUsername,
      };
      socket.emit('send-message', newMessage);
      setUserText((data) => [...data, newMessage]);
    }
    setInputValue('');
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
          {userText.map((message, index) => (
            <li
              key={index}
              className={`p-5 border text-white ${
                message.isSent
                  ? 'text-end bg-blue-500 rounded-tl-xl rounded-bl-xl rounded-br-xl'
                  : 'text-start bg-green-500 rounded-tr-xl rounded-br-xl rounded-bl-xl'
              }`}
            >
              <span className='text-white'>{message.username}:</span>{' '}
              {message.text}
              {/* <span className='text-white'>{' asdasd'}</span> */}
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
