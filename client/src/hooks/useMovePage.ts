import { useNavigate } from 'react-router-dom';

const useMovePage = (url: string) => {
  const navigate = useNavigate();
  const goToPage = () => {
    navigate(url);
  };
  return goToPage;
};

export default useMovePage;
