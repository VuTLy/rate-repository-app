import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primary, // app bar background
  },
  tabsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const AppBar = () => (
  <View style={styles.container}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabsContainer}
    >
      <AppBarTab text="Repositories" to="/" />
      <AppBarTab text="Sign in" to="/signin" />
      <AppBarTab text="Users" to="/users" />
      <AppBarTab text="Profile" to="/profile" />
      <AppBarTab text="Settings" to="/settings" />
      <AppBarTab text="Help" to="/help" />
      {/* Add more tabs here to test horizontal scroll */}
    </ScrollView>
  </View>
);

export default AppBar;
