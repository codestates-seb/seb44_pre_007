export type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export type Question = {
  id: number;
  questionUserNickname: string;
  question_title: string;
  question_content: string;
  question_tag: string[];
  question_created: string;
  question_updated: string;
  answerCount: number;
};
