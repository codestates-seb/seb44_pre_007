import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from './pages/Root';
<<<<<<< HEAD
import QuestionsPage from './pages/Questions';
=======
import Questions from './pages/Questions';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
>>>>>>> 03d4ca568ac02159b2d596bec4f7a31ecd2984a4

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'questions',
        element: <QuestionsPage />,
      },
    ],
  },
  {
    path: 'users',
    element: <Users />,
    children: [
      {
        path: 'signup',
        element: <SignUp />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
export default App;
