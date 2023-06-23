import { styled } from 'styled-components';
import tw from 'tailwind-styled-components';
import Search from '../../public/Icons/SpotSearch';
import Lock from '../../public/Icons/SpotLock';

const Spot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  gap: 8px;
  border-radius: 3px;
  height: 253px;
`;

const BlueSpot = styled(Spot)`
  &:after {
    position: absolute;
    top: 99%;
    left: 0px;
    clip-path: polygon(18px 0, 32px 0, 0 40px, 0 38px, 0 0, 18px 0);
    content: '';
    width: 42px;
    height: 32px;
    display: block;
    background-color: #cde9fe;
    border-radius: 0 5px 0;
  }
`;

const OrangeSpot = styled(Spot)`
  &:after {
    position: absolute;
    top: 99%;
    right: 0;
    clip-path: polygon(18px 0, 32px 0, 0 40px, 0 38px, 0 0, 18px 0);
    content: '';
    width: 42px;
    height: 32px;
    display: block;
    background-color: #fee3cd;
    border-radius: 0 5px 0;
    transform: scaleX(-1);
  }
`;

const H2 = tw.h2`
w-[315px] text-center text-blackDark mb-[19px]
`;

const Btn = tw.button`
text-white bg-main px-8 py-3 rounded-[3px]
`;

function SpotDiv() {
  return (
    <div className="flex gap-6 mb-7">
      <OrangeSpot className="bg-[#FEE3CD]">
        <div className="mb-4">
          <Search style={{ width: '40', height: '40' }} />
        </div>
        <H2>Find the best answer to your technical question, help others answer theirs</H2>
        <Btn type="button">Join the community</Btn>
        <div className="flex gap-1">
          <p className="text-[13px]">or</p>
          <p className="text-[13px] border-b border-blackDark">search content</p>
        </div>
      </OrangeSpot>
      <BlueSpot className="bg-[#cde9fe]">
        <div className="mb-4">
          <Lock style={{ width: '40', height: '40' }} />
        </div>
        <H2>Want a secure, private space for your technical knowledge?</H2>
        <Btn className="bg-blue-600" type="button">
          Discover Teams
        </Btn>
      </BlueSpot>
    </div>
  );
}

export default SpotDiv;
