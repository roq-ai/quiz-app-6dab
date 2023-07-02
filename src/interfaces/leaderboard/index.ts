import { UserInterface } from 'interfaces/user';
import { QuizInterface } from 'interfaces/quiz';
import { GetQueryInterface } from 'interfaces';

export interface LeaderboardInterface {
  id?: string;
  score: number;
  user_id?: string;
  quiz_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  quiz?: QuizInterface;
  _count?: {};
}

export interface LeaderboardGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  quiz_id?: string;
}
