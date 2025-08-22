// src/hooks/useSignIn.js
import { useMutation, useApolloClient } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import AuthStorage from '../utils/authStorage';

const authStorage = new AuthStorage();

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: { credentials: { username, password } },
    });

    // Save the access token
    await authStorage.setAccessToken(data.authenticate.accessToken);

    // Reset Apollo Client store to refresh all queries
    await apolloClient.resetStore();

    return data;
  };

  return [signIn, result];
};

export default useSignIn;
