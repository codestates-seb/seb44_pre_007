export type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export interface QueListT {
  id: number;
  questionUserNickname: string;
  question_title: string;
  question_content: string;
  question_tag: TagT[];
  question_created: string;
  question_updated: string;
  answerCount: number;
}

export type AnswerT = {
  answerId: number;
  answerUserNickName: string;
  answerContent: string;
  answerCreated: string;
  answerUpdated: string;
};

export type QueT = QueListT & {
  answers: AnswerT[];
};

export type TagT = {
  tagId: number;
  tagName: string;
};
