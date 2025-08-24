import React from 'react';
import { View, StyleSheet, ScrollView, Button } from 'react-native';
import Constants from 'expo-constants';
import { useQuery, useApolloClient } from '@apollo/client';
import { ME } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary,
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const authStorage = new AuthStorage();

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        <AppBarTab text="Repositories" to="/" />
        {data?.me && <AppBarTab text="Create a review" to="/create-review" />}
        {data?.me && <AppBarTab text="My reviews" to="/my-reviews" />}
        {data?.me ? (
          <Button title="Sign out" onPress={handleSignOut} />
        ) : (
          <AppBarTab text="Sign in" to="/signin" />
        )}
        <AppBarTab text="Users" to="/users" />
        <AppBarTab text="Profile" to="/profile" />
        <AppBarTab text="Settings" to="/settings" />
        <AppBarTab text="Help" to="/help" />
      </ScrollView>
    </View>
  );
};

export default AppBar;
