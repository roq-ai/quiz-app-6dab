import * as yup from 'yup';

export const quizValidationSchema = yup.object().shape({
  title: yup.string().required(),
  client_id: yup.string().nullable(),
});
