export type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export type Question = {
  id: number;
  questionUserNickname: string;
  question_title: string;
  question_content: string;
  question_tag: TagT[];
  question_created: string;
  question_updated: string;
  answerCount: number;
};

export type TagT = {
  tagId: number;
  tagName: string;
};
