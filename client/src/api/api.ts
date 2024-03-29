/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

const accessToken = localStorage.getItem('token');

export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = token || '';
  return config;
});

export const GetUser = () => instance.get('/principal').then((res) => res.data.body.data);

export const FetchQuestions = async (page: number, limit: number) =>
  instance.get(`/questions?page=${page}&limit=${limit}`);

export const FetchQuestion = async (question_id: number) =>
  instance.get(`/questions/${question_id}`);

export const FetchTags = async (questionTag: string) =>
  instance.get(`/questions/tagged/${questionTag}`);

export const PostData = async ({ id, text }: { id: string; text: string }) =>
  instance.post(`/questions/${id}`, { answerContent: text });

export const PatchAnswerData = async ({
  id,
  answerId,
  text,
}: {
  id: string;
  answerId: string;
  text: string;
}) => instance.patch(`/questions/${id}/${answerId}/edit`, { answerContent: text });

export const DelAnswerData = async ({ id, answerId }: { id: string; answerId: string }) =>
  instance.delete(`/questions/${id}/${answerId}/edit`);

export const DelQueData = async ({ id }: { id: string }) => instance.delete(`/questions/${id}`);

export const PostQuestionData = async ({
  title,
  contents,
  tags,
}: {
  title: string;
  contents: string;
  tags: string[];
}) =>
  instance.post('/questions/ask', {
    questionTitle: title,
    questionContent: contents,
    questionTag: tags,
  });

export const PatchQuestionData = async ({
  id,
  title,
  contents,
  tags,
}: {
  id: string;
  title: string;
  contents: string;
  tags: string[];
}) =>
  instance.patch(`/questions/${id}/edit`, {
    questionTitle: title,
    questionContent: contents,
    questionTag: tags,
  });

export const PostQueVoteLike = async ({ id }: { id: string }) =>
  instance.post(`/questions/${id}/like`);

export const PostQueVoteDislike = async ({ id }: { id: string }) =>
  instance.post(`/questions/${id}/dislike`);

export const PostAnsVoteLike = async ({ answerId }: { answerId: number }) =>
  instance.post(`/answers/${answerId}/like`);

export const PostAnsDislike = async ({ answerId }: { answerId: number }) =>
  instance.post(`/answers/${answerId}/dislike`);
