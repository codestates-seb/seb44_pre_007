export type Props = {
  children: string | JSX.Element | JSX.Element[];
  primaryColor: string;
  hoverColor: string;
};

export interface IconStyle {
  width: string;
  height: string;
  color: string;
}

export interface UserInfo {
  userNickname: string | null;
  userEmail: string | null;
  userPassword: string | null;
}
