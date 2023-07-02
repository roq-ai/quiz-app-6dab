import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createLeaderboard } from 'apiSdk/leaderboards';
import { Error } from 'components/error';
import { leaderboardValidationSchema } from 'validationSchema/leaderboards';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { UserInterface } from 'interfaces/user';
import { QuizInterface } from 'interfaces/quiz';
import { getUsers } from 'apiSdk/users';
import { getQuizzes } from 'apiSdk/quizzes';
import { LeaderboardInterface } from 'interfaces/leaderboard';

function LeaderboardCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: LeaderboardInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createLeaderboard(values);
      resetForm();
      router.push('/leaderboards');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<LeaderboardInterface>({
    initialValues: {
      score: 0,
      user_id: (router.query.user_id as string) ?? null,
      quiz_id: (router.query.quiz_id as string) ?? null,
    },
    validationSchema: leaderboardValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Leaderboard
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="score" mb="4" isInvalid={!!formik.errors?.score}>
            <FormLabel>Score</FormLabel>
            <NumberInput
              name="score"
              value={formik.values?.score}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('score', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.score && <FormErrorMessage>{formik.errors?.score}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<QuizInterface>
            formik={formik}
            name={'quiz_id'}
            label={'Select Quiz'}
            placeholder={'Select Quiz'}
            fetcher={getQuizzes}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'leaderboard',
    operation: AccessOperationEnum.CREATE,
  }),
)(LeaderboardCreatePage);
