import tw from 'tailwind-styled-components';

const StyleP = tw.p`
break-words text-[13px] w-[270px] mt-8 text-gray-500
`;
export const StyledA = tw.a`
text-blue-500
`;

export default function Policy() {
  return (
    <StyleP>
      By clicking “Sign up”, you agree to our{' '}
      <StyledA href="https://stackoverflow.com/legal/terms-of-service/public">
        terms of service
      </StyledA>{' '}
      and acknowledge that you have read and understand our{' '}
      <StyledA href="https://stackoverflow.com/legal/privacy-policy">privacy policy</StyledA> and{' '}
      <StyledA href="https://stackoverflow.com/conduct">code of conduct</StyledA>.
    </StyleP>
  );
}
