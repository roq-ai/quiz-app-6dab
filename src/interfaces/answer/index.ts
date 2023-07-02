import { QuestionInterface } from 'interfaces/question';
import { GetQueryInterface } from 'interfaces';

export interface AnswerInterface {
  id?: string;
  content: string;
  is_correct: boolean;
  question_id?: string;
  created_at?: any;
  updated_at?: any;

  question?: QuestionInterface;
  _count?: {};
}

export interface AnswerGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  question_id?: string;
}
