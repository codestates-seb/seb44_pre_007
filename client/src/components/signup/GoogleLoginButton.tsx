import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import tw from 'tailwind-styled-components';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import GoogleIcon from '../../public/Icons/GoogleIcon';

export default function GoogleLoginButton() {
  const mutation = useMutation({
    mutationFn: (tokenResponse: Omit<TokenResponse, 'error' | 'error_description' | 'error_uri'>) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      axios.post(import.meta.env.VITE_URL, tokenResponse),
  });

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      mutation.mutate(tokenResponse);
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
