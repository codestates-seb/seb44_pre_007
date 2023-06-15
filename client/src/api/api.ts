/* eslint-disable implicit-arrow-linebreak */
import axios from 'axios';

export const FetchQuestions = (limit: number) =>
  axios.get(`http://localhost:5000/questions?_limit=${limit}`);

export const FetchQuestion = (question_id: number) =>
  axios.get(`http://localhost:5000/questions/${question_id}`);
