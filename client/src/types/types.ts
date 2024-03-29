export type Props = {
  children: string | JSX.Element | JSX.Element[];
  primaryColor?: string;
  hoverColor?: string;
};

export type Question = {
  questionId: number;
  questionCount: number;
  questionUserNickname: string;
  questionTitle: string;
  questionContent: string;
  tagList: TagT[];
  questionCreated: string;
  questionUpdated: string;
  answerCount: number;
  questionVoteCount: number;
  questionVoteStatus: 'NONE' | 'LIKE' | 'DISLIKE';
};

export type AnswerT = {
  answerId: number;
  answerUserNickname: string;
  answerContent: string;
  answerCreated: string;
  answerUpdated: string;
  answerUserEmail: string;
  answerVoteCount: number;
  answerVoteStatus: 'NONE' | 'LIKE' | 'DISLIKE';
};

export type QueT = Question & {
  id: number;
  userEmail: string;
  answerList: AnswerT[];
};

export type PageT = {
  limit: number;
  page: number;
  totalElement: number;
  totalPages: number;
};

export type TagT = {
  tagId: number;
  tagName: string;
};

export interface IconStyle {
  width: string;
  height: string;
  color?: string;
  margin?: string;
}

export interface UserInfo {
  userNickname: string | null;
  userEmail: string | null;
  userPassword: string | null;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
