const Alert = ({ modalMessage, closeModal }: any) => {
  setTimeout(() => {
    closeModal();
  }, 3000);

  return (
    <div className='fixed top-0 left-0 w-full mt-5 flex items-center justify-center'>
      <div className='w-96 bg-red-500 text-white p-4 flex items-center justify-center rounded-xl'>
        <p className='text-center text-xl font-bold'>{modalMessage}</p>
      </div>
    </div>
  );
};

export default Alert;
