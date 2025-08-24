import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_REVIEW } from '../graphql/mutations';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: theme.colors.textSecondary,
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export const validationSchema = Yup.object().shape({
  ownerName: Yup.string().required('Repository owner username is required'),
  repositoryName: Yup.string().required('Repository name is required'),
  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),
  text: Yup.string(),
});

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

/**
 * Pure Formik form container (no Apollo or navigation).
 */
export const ReviewFormContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={{ padding: 15 }}>
        <TextInput
          style={styles.input}
          placeholder="Repository owner username"
          onChangeText={handleChange('ownerName')}
          onBlur={handleBlur('ownerName')}
          value={values.ownerName}
          testID="ownerName"
        />
        {touched.ownerName && errors.ownerName && (
          <Text style={styles.error}>{errors.ownerName}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Repository name"
          onChangeText={handleChange('repositoryName')}
          onBlur={handleBlur('repositoryName')}
          value={values.repositoryName}
          testID="repositoryName"
        />
        {touched.repositoryName && errors.repositoryName && (
          <Text style={styles.error}>{errors.repositoryName}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Rating between 0 and 100"
          keyboardType="numeric"
          onChangeText={handleChange('rating')}
          onBlur={handleBlur('rating')}
          value={values.rating}
          testID="rating"
        />
        {touched.rating && errors.rating && (
          <Text style={styles.error}>{errors.rating}</Text>
        )}

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Review (optional)"
          multiline
          onChangeText={handleChange('text')}
          onBlur={handleBlur('text')}
          value={values.text}
          testID="text"
        />
        {touched.text && errors.text && (
          <Text style={styles.error}>{errors.text}</Text>
        )}

        <Pressable style={styles.button} onPress={handleSubmit} testID="submitButton">
          <Text style={styles.buttonText}>Create a review</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

/**
 * Side-effect wrapper (Apollo + navigation).
 */
const ReviewForm = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const { data } = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text,
          },
        },
      });

      resetForm();
      const repoId = data.createReview.repositoryId;
      navigate(`/repository/${repoId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default ReviewForm;
