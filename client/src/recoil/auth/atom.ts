/* eslint-disable import/prefer-default-export */
import { atom } from 'recoil';
import { UserInfo } from '../../types/types';

export const userInfoState = atom<Omit<UserInfo, 'userPassword'>>({
  key: 'userInfoState',
  default: {
    userNickname: '',
    userEmail: '',
  },
});
