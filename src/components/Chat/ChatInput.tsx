export default function ChatInput({
  userText,
  submitForm,
  inputValue,
  loginInput,
  setUserText,
}: any) {
  function deleteSessionText() {
    setUserText([]);
    console.log('deleted Session');
  }
  function checkInput() {
    if (inputValue === '') {
      alert('Please Put details in input');
    }
    return;
  }
  return (
    <div className={'flex flex-col p-1'} style={{ height: '85vh' }}>
      <div className='flex flex-col justify-center items-center'>
        <button
          onClick={deleteSessionText}
          className='border border-neutral-800 p-2 text-neutral-800 rounded-lg text-2xl mt-5 shadow-lg'
        >
          Clear Chat
        </button>
      </div>
      <ul className='border border-gray-300 rounded-lg mt-10 overflow-y-auto flex-grow'>
        {userText.map((message: any, index: any) => (
          <div
            key={index}
            className={`p-3 text-lg m-2 w-40  ${
              message.isSent
                ? 'self-end text-end bg-blue-500 text-white ml-auto rounded-l-xl rounded-b-lg'
                : 'self-start text-start bg-gray-200 text-black rounded-r-xl rounded-b-lg'
            }`}
          >
            <span>{`${message.username}: `}</span>
            <span className='break-words'>{message.text}</span>
            <p className={'text-xs'}>{message.time}</p>
          </div>
        ))}
      </ul>

      <form
        onSubmit={submitForm}
        className='m-2 p-2 rounded-lg flex bg-gray-200 shadow-md justify-between'
      >
        <input
          type='text'
          value={inputValue}
          onChange={loginInput}
          placeholder='Type Message...'
          className='border border-gray-300 p-2 rounded-xl flex-grow bg-white focus:outline-none'
          required
        />
        <input
          type='submit'
          value='Send'
          className='border border-blue-500 text-white p-2 rounded-xl bg-blue-500 cursor-pointer m-2'
          onClick={checkInput}
        />
      </form>
    </div>
  );
}