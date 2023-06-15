import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import Questions from './pages/Questions';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
