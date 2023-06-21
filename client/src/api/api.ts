/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import getToken from '../utils/getToken';

export const FetchQuestions = (page: number, limit: number) =>
  axios.get(`http://3.35.43.193:8080/questions?page=${page}&limit=${limit}`);

export const FetchQuestion = (question_id: number) =>
  axios.get(`http://3.35.43.193:8080/questions/${question_id}`);

export const Login = async (username: string, password: string) => {
  const response = await axios.post('http://3.35.43.193:8080/login', { username, password });
  return response;
};

const accessToken = localStorage.getItem('token');

export const instance = axios.create({
  baseURL: 'http://3.35.43.193:8080/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: accessToken,
  },
});

export const PostData = async ({ id, text }: { id: string | undefined; text: string }) =>
  instance.post(`/questions/${id}`, { answerContent: text });
