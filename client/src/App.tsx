import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from './pages/Root';
import Questions from './pages/Questions';
import SignUp from './pages/SignUp';
import Users from './pages/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'questions',
        element: <Questions />,
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
