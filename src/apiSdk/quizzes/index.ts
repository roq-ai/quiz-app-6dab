import axios from 'axios';
import queryString from 'query-string';
import { QuizInterface, QuizGetQueryInterface } from 'interfaces/quiz';
import { GetQueryInterface } from '../../interfaces';

export const getQuizzes = async (query?: QuizGetQueryInterface) => {
  const response = await axios.get(`/api/quizzes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createQuiz = async (quiz: QuizInterface) => {
  const response = await axios.post('/api/quizzes', quiz);
  return response.data;
};

export const updateQuizById = async (id: string, quiz: QuizInterface) => {
  const response = await axios.put(`/api/quizzes/${id}`, quiz);
  return response.data;
};

export const getQuizById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/quizzes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteQuizById = async (id: string) => {
  const response = await axios.delete(`/api/quizzes/${id}`);
  return response.data;
};
