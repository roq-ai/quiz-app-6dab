import { LeaderboardInterface } from 'interfaces/leaderboard';
import { QuestionInterface } from 'interfaces/question';
import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface QuizInterface {
  id?: string;
  title: string;
  client_id?: string;
  created_at?: any;
  updated_at?: any;
  leaderboard?: LeaderboardInterface[];
  question?: QuestionInterface[];
  client?: ClientInterface;
  _count?: {
    leaderboard?: number;
    question?: number;
  };
}

export interface QuizGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  client_id?: string;
}
