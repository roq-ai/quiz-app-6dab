import * as yup from 'yup';

export const leaderboardValidationSchema = yup.object().shape({
  score: yup.number().integer().required(),
  user_id: yup.string().nullable(),
  quiz_id: yup.string().nullable(),
});
