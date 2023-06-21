import tw from 'tailwind-styled-components';
import GoogleIcon from '../../public/Icons/GoogleIcon';

export default function GoogleLoginButton() {
  const handleLogin = () => {
    // eslint-disable-next-line operator-linebreak
    window.location.href = import.meta.env.VITE_SOCIAL_LOGIN_URL;
  };
  const StyledButton = tw.button`
  flex justify-center border border-buttonBorder rounded w-full bg-white py-2.5 text-[13px] hover:bg-buttonHover active:shadow-btnActive
  `;

  return (
    <StyledButton type="button" onClick={() => handleLogin()}>
      <GoogleIcon /> Sign up with Google
    </StyledButton>
  );
}
