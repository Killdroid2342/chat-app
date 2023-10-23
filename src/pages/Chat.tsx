import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from '../hooks/Auth';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
const { VITE_API_URL } = import.meta.env;
import axios from 'axios';
import Nav from '../components/Nav';
import { io, Socket } from 'socket.io-client';
import ChatInput from '../components/Chat/ChatInput';
interface chatData {
  isSent: boolean;
  text: string;
  username: string;
  time: string;
}
const Chat = () => {
  Auth();
  const [userText, setUserText] = useState<Array<chatData>>([]);
  console.log(userText);
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
      console.log(`Well done you have connected ${newSocket.id}`);
    });

    newSocket.on('recieve-message', (message) => {
      if (message.username && message.text) {
        setUserText((data) => [
          ...data,
          {
            isSent: false,
            text: message.text,
            username: message.username,
            time: new Date().toLocaleTimeString(),
          },
        ]);
      }
      console.log(message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  async function submitForm(e: React.FormEvent) {
    e.preventDefault();

    if (socket) {
      const newMessage = {
        isSent: true,
        text: inputValue,
        username: clientUsername,
        time: new Date().toLocaleTimeString(),
      };
      setUserText((data) => [...data, newMessage]);

      socket.emit('send-message', newMessage);

      try {
        await instance.post('message/uploadMessage', {
          text: newMessage.text,
          time: newMessage.time,
          username: newMessage.username,
        });
      } catch (e) {
        console.error('Error posting the message:', e);
      }

      setInputValue('');
    }
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
    <div className='h-screen bg-white'>
      <Nav
        clientUsername={clientUsername}
        logOut={logOut}
        deleteAccount={deleteAccount}
      />
      <h1 className='text-3xl text-neutral-800 font-mono pt-10 text-center'>
        Chat App
      </h1>
      <ChatInput
        setUserText={setUserText}
        userText={userText}
        submitForm={submitForm}
        inputValue={inputValue}
        loginInput={loginInput}
      />
    </div>
  );
};

export default Chat;
