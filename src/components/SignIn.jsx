import React from 'react';
import { View, TextInput, Text, Button, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  errorText: {
    color: '#d73a4a',
    marginBottom: 10,
  },
});

const signInSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const SignIn = () => {
  const initialValues = { username: '', password: '' };
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await signIn(values);
      console.log('Authenticated user data:', data);
      navigate('/'); // redirect to repository list after sign in
    } catch (e) {
      console.error('Sign in error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signInSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={[
                styles.input,
                touched.username && errors.username && styles.inputError,
              ]}
              placeholder="Username"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
            />
            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              style={[
                styles.input,
                touched.password && errors.password && styles.inputError,
              ]}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Button title="Sign In" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default SignIn;

