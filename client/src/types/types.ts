export type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export type Question = {
  questionId: number;
  questionUserNickname: string;
  questionTitle: string;
  questionContent: string;
  tagList: TagT[];
  questionCreated: string;
  questionUpdated: string;
  answerCount: number;
};

export type TagT = {
  tagId: number;
  tagName: string;
};
