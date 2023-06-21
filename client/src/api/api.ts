/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

const accessToken = localStorage.getItem('token');

export const Login = async (username: string, password: string) => {
  const response = await axios.post('http://3.35.43.193:8080/login', { username, password });
  return response;
};

export const instance = axios.create({
  baseURL: 'http://3.35.43.193:8080/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  },
});

export const FetchQuestions = (page: number, limit: number) =>
  instance.get(`/questions?page=${page}&limit=${limit}`);

export const FetchQuestion = (question_id: number) => instance.get(`/questions/${question_id}`);

export const PostData = async ({ id, text }: { id: string | undefined; text: string }) =>
  instance.post(`/questions/${id}`, { answerContent: text });

export const PatchData = async ({
  id,
  answerId,
  text,
}: {
  id: string;
  answerId: string;
  text: string;
}) => instance.patch(`/questions/${id}/${answerId}/edit`, { answerContent: text });
