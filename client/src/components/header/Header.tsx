import tw from 'tailwind-styled-components';
import SearchBox from './SearchBox';
import NavBar from './NavBar';
import MainLogo from './MainLogo';
/** 로고 라우팅
 * 서치바 박스섀도우
 * 서치바 로고
 * 서치바 미디어쿼리
 * 유저 정보 받아오기
 * 호버시 색 진해지도록
 */
export default function Header() {
  const StyledHeader = tw.header`
  sticky flex justify-center items-center w-full border-b
  `;

  const StyledWrapper = tw.div`
  flex items-center w-full max-w-7xl h-full
  `;

  const StyledMenuBtn = tw.span`
  rounded-full hover:bg-gray-200 hover:text-gray-800 p-2 text-sm text-gray-500 translate-y-0.5 cursor-pointer
  `;

  return (
    <StyledHeader>
      <StyledWrapper>
        <MainLogo />
        <StyledMenuBtn>Products</StyledMenuBtn>
        <SearchBox />
        <NavBar />
      </StyledWrapper>
    </StyledHeader>
  );
}
