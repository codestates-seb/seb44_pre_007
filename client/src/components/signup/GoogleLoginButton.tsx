import { useGoogleLogin } from '@react-oauth/google';
import tw from 'tailwind-styled-components';
import axios from 'axios';
import GoogleIcon from '../../public/Icons/GoogleIcon';

export default function GoogleLoginButton() {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      axios.post(import.meta.env.VITE_URL, tokenResponse.access_token);
    },
  });
  const StyledButton = tw.button`
  flex justify-center border border-buttonBorder rounded w-full bg-white py-2.5 text-[13px] hover:bg-buttonHover active:shadow-btnActive
  `;
  return (
    <StyledButton type="button" onClick={() => login()}>
      <GoogleIcon /> Sign up with Google
    </StyledButton>
  );
}
