import React, { useState } from 'react';

const Chat = () => {
  const [userText, setUserText] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  console.log(userText.length);
  console.log(userText);
  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    setUserText((data) => [...data, inputValue]);
    setInputValue('');
  }

  function loginInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setInputValue(value);
  }
  function clearChat() {
    if (userText.length === 0) {
      alert('Nothing to clear');
    } else {
      alert('Chat Cleared');
    }
    setUserText([]);
  }
  return (
    <div className='h-screen bg-slate-900'>
      <nav>
        <ul className='flex flex-row justify-end'>
          <li className='text-white m-3'>Account: {'asdasd'}</li>
          <li className='text-white m-3'>Log Out</li>
          <li className='text-white m-3'>Delete Account</li>
        </ul>
      </nav>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl text-white font-mono pt-10'>Chat App</h1>
        <button
          className='text-white border border-white p-2 rounded-xl mt-2 cursor-pointer'
          onClick={clearChat}
        >
          Delete Logs
        </button>
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
