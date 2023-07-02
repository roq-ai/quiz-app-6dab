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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getAnswerById, updateAnswerById } from 'apiSdk/answers';
import { Error } from 'components/error';
import { answerValidationSchema } from 'validationSchema/answers';
import { AnswerInterface } from 'interfaces/answer';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { QuestionInterface } from 'interfaces/question';
import { getQuestions } from 'apiSdk/questions';

function AnswerEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AnswerInterface>(
    () => (id ? `/answers/${id}` : null),
    () => getAnswerById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AnswerInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAnswerById(id, values);
      mutate(updated);
      resetForm();
      router.push('/answers');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AnswerInterface>({
    initialValues: data,
    validationSchema: answerValidationSchema,
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
            Edit Answer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="content" mb="4" isInvalid={!!formik.errors?.content}>
              <FormLabel>Content</FormLabel>
              <Input type="text" name="content" value={formik.values?.content} onChange={formik.handleChange} />
              {formik.errors.content && <FormErrorMessage>{formik.errors?.content}</FormErrorMessage>}
            </FormControl>
            <FormControl
              id="is_correct"
              display="flex"
              alignItems="center"
              mb="4"
              isInvalid={!!formik.errors?.is_correct}
            >
              <FormLabel htmlFor="switch-is_correct">Is Correct</FormLabel>
              <Switch
                id="switch-is_correct"
                name="is_correct"
                onChange={formik.handleChange}
                value={formik.values?.is_correct ? 1 : 0}
              />
              {formik.errors?.is_correct && <FormErrorMessage>{formik.errors?.is_correct}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<QuestionInterface>
              formik={formik}
              name={'question_id'}
              label={'Select Question'}
              placeholder={'Select Question'}
              fetcher={getQuestions}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.content}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
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
    entity: 'answer',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AnswerEditPage);
