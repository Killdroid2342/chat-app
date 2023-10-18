const Nav = ({ clientUsername, logOut, deleteAccount }: any) => {
  return (
    <nav>
      <ul className='flex flex-row justify-end'>
        <li className='text-white m-3'>Account: {clientUsername}</li>
        <li className='text-white m-3 cursor-pointer' onClick={logOut}>
          Log Out
        </li>
        <li className='text-white m-3 cursor-pointer' onClick={deleteAccount}>
          Delete Account
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
