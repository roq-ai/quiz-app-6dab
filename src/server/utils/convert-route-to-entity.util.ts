const mapping: Record<string, string> = {
  answers: 'answer',
  clients: 'client',
  leaderboards: 'leaderboard',
  questions: 'question',
  quizzes: 'quiz',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
