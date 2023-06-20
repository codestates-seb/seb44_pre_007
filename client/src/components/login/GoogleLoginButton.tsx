import tw from 'tailwind-styled-components';
import GoogleIcon from '../../public/Icons/GoogleIcon';

export default function GoogleLoginButton() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };
  const StyledButton = tw.button`
  flex justify-center border border-buttonBorder rounded w-full bg-white py-2.5 text-[13px] hover:bg-buttonHover active:shadow-btnActive
  `;

  return (
    <StyledButton type="button" onClick={() => handleLogin()}>
      <GoogleIcon /> Log in with Google
    </StyledButton>
  );
}
