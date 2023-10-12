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
    path: '/Chat',
    element: <Chat />,
  },
  {
    path: '*',
    element: <Error />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
