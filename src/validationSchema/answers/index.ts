import * as yup from 'yup';

export const answerValidationSchema = yup.object().shape({
  content: yup.string().required(),
  is_correct: yup.boolean().required(),
  question_id: yup.string().nullable(),
});
