/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

export const FetchQuestions = (page: number, limit: number) =>
  axios.get(`http://3.35.43.193:8080/questions?page=${page}&limit=${limit}`);

export const FetchQuestion = (question_id: number) =>
  axios.get(`http://localhost:5000/questions/${question_id}`);
