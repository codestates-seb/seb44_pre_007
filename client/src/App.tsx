import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// eslint-disable-next-line object-curly-newline
import { RecoilRoot } from 'recoil';
import Root from './pages/Root';
import QuestionsPage from './pages/Questions';
import QuestionPage from './pages/Question';
import SignUp from './pages/SignUp';
import Users from './pages/Users';
import Login from './pages/Login';
import AnswerEdit from './pages/AnswerEdit';
import Tags from './pages/Tags';
import Mypage from './pages/Mypage';
import UserEdit from './pages/UserEdit';

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
      {
        path: 'questions/:id/:answerId/edit',
        element: <AnswerEdit />,
      },
      {
        path: 'questions/tagged/:questionTag',
        element: <Tags />,
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
      {
        path: 'mypage',
        element: <Mypage />,
      },
      {
        path: 'edit',
        element: <UserEdit />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}
export default App;
