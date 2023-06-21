/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';
import getToken from '../utils/getToken';

export const FetchQuestions = (page: number, limit: number) =>
  axios.get(`http://3.35.43.193:8080/questions?page=${page}&limit=${limit}`);

export const FetchQuestion = (question_id: number) =>
  axios.get(`http://3.35.43.193:8080/questions/${question_id}`);

export const PostData = async ({ id, text }: { id: string | undefined; text: string }) =>
  axios.post(
    `http://3.35.43.193:8080/questions/${id}`,
    { answerContent: text },
    {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${getToken()}`,
      },
    }
  );
