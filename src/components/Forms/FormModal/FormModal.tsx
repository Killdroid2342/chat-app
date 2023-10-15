import React from 'react';

const FormModal = (props: any) => {
  return (
    <div className='fixed inset-0 flex justify-center z-50'>
      <p className='m-20 text-2xl text-neutral-800'>
        <span className='p-4 rounded-lg bg-white shadow-lg'>
          {props.responseMessage}
        </span>
      </p>
    </div>
  );
};

export default FormModal;
