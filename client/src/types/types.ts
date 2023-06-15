export type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export type Question = {
  id: number;
  user_id: number;
  question_content: string;
  question_created: string;
  question_tag: string[];
  question_title: string;
  question_updated: string;
};
