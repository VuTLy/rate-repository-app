import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import { SignInContainer } from './SignInContainer';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.background,
    flex: 1,
  },
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await signIn(values);
      console.log('Authenticated user data:', data);
      navigate('/'); // redirect after sign in
    } catch (e) {
      console.error('Sign in error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <SignInContainer onSubmit={onSubmit} />
    </View>
  );
};

export default SignIn;
