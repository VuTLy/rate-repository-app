import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { CREATE_USER, AUTHENTICATE } from '../graphql/mutations';
import theme from '../theme';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

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
  username: Yup.string()
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters')
    .required('Username is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters')
    .required('Password is required'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

/**
 * Pure form container (no Apollo or navigation).
 */
export const SignUpContainer = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={validationSchema}
  >
    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
      <View style={{ padding: 15 }}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={handleChange('username')}
          onBlur={handleBlur('username')}
          value={values.username}
          testID="username"
        />
        {touched.username && errors.username && (
          <Text style={styles.error}>{errors.username}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          testID="password"
        />
        {touched.password && errors.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Password confirmation"
          secureTextEntry
          onChangeText={handleChange('passwordConfirmation')}
          onBlur={handleBlur('passwordConfirmation')}
          value={values.passwordConfirmation}
          testID="passwordConfirmation"
        />
        {touched.passwordConfirmation && errors.passwordConfirmation && (
          <Text style={styles.error}>{errors.passwordConfirmation}</Text>
        )}

        <Pressable style={styles.button} onPress={handleSubmit} testID="submitButton">
          <Text style={styles.buttonText}>Sign up</Text>
        </Pressable>
      </View>
    )}
  </Formik>
);

/**
 * Side-effect wrapper: calls createUser → signIn → navigate.
 */
const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [authenticate] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      const { username, password } = values;

      await createUser({ variables: { user: { username, password } } });

      const { data } = await authenticate({
        variables: { credentials: { username, password } },
      });

      await authStorage.setAccessToken(data.authenticate.accessToken);
      await apolloClient.resetStore();

      navigate('/');
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
