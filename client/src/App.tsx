import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Root from './pages/Root';
import QuestionsPage from './pages/Questions';
import QuestionPage from './pages/Question';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'questions',
        element: <QuestionsPage />,
      },
      {
        path: 'questions/:id',
        element: <QuestionPage />,
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
      {
        path: 'login',
        element: <Login />,
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
