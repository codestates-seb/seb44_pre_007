import tw from 'tailwind-styled-components';

const LiText13px = tw.li`
text-[13px]
`;

export const LiNavDisable = tw(LiText13px)`
p-1 pl-[30px] text-inactive cursor-pointer
`;

export const Liml8mt16 = tw.li`
ml-2 mt-4 text-label text-[11px]
`;

export const Lip8pr6 = tw(LiText13px)`
p-2 pr-1.5 text-inactive cursor-pointer
`;

export const FlexDiv = tw.div`
flex items-center`;

export const LiBtn = tw.li`
border-none p-1.5  flex justify-center text-[11px] cursor-pointer rounded-[3px]
`;
