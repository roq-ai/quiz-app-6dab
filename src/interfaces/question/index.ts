import { AnswerInterface } from 'interfaces/answer';
import { QuizInterface } from 'interfaces/quiz';
import { GetQueryInterface } from 'interfaces';

export interface QuestionInterface {
  id?: string;
  content: string;
  quiz_id?: string;
  created_at?: any;
  updated_at?: any;
  answer?: AnswerInterface[];
  quiz?: QuizInterface;
  _count?: {
    answer?: number;
  };
}

export interface QuestionGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  quiz_id?: string;
}
