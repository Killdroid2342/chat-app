const Nav = ({ clientUsername, logOut, deleteAccount }: any) => {
  return (
    <nav>
      <ul className='flex flex-row justify-end'>
        <li className='text-neutral-800 m-3 font-mono font-bold'>
          Account: {clientUsername}
        </li>
        <li
          className='text-neutral-800 m-3 font-mono font-bold cursor-pointer'
          onClick={logOut}
        >
          Log Out
        </li>
        <li
          className='text-neutral-800 m-3 font-mono font-bold cursor-pointer'
          onClick={deleteAccount}
        >
          Delete Account
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
