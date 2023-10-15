import { useState } from 'react';
import Login from '../components/Forms/Login';
import Register from '../components/Forms/Register';

const Main = () => {
  const [form, setForm] = useState('Register');

  const changeForm = () => {
    if (form === 'Register') {
      setForm('Login');
    } else {
      setForm('Register');
    }
  };
  return (
    <div>
      {form === 'Register' ? (
        <Login changeForm={changeForm} />
      ) : (
        <Register changeForm={changeForm} />
      )}
    </div>
  );
};

export default Main;
