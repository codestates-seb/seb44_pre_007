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
import Home from './pages/Home';
import ErrorPage from './pages/Error';
import QuestionsLayout from './pages/QuestionsRoot';
import AskQuestion from './pages/AskQuestion';
import { checkAuthLoader, tokenLoader } from './utils/auth';
import EditQuestion from './pages/EditQuestion';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'questions',
        element: <QuestionsLayout />,
        children: [
          { index: true, element: <QuestionsPage /> },
          {
            path: ':id',
            element: <QuestionPage />,
          },
          {
            path: ':id/:answerId/edit',
            element: <AnswerEdit />,
            loader: checkAuthLoader,
          },
          {
            path: 'tagged/:questionTag',
            element: <Tags />,
          },
          {
            path: 'ask',
            element: <AskQuestion />,
            loader: checkAuthLoader,
          },
          {
            path: ':id/edit',
            element: <EditQuestion />,
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
            loader: checkAuthLoader,
          },
        ],
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
