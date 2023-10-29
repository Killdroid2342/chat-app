import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Chat from './pages/Chat';
import Error from './pages/Error';
import Main from './pages/Main';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);

const App = () => {
  console.log(import.meta.env.MODE);
  return <RouterProvider router={router} />;
};

export default App;
