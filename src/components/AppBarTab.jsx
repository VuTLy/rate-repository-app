import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../theme';

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  tabText: {
    color: theme.colors.textPrimary,
    fontWeight: '700',
    fontSize: 16,
  },
});

const AppBarTab = ({ text, to }) => (
  <Link to={to} component={Pressable} style={styles.tab}>
    <Text style={styles.tabText}>{text}</Text>
  </Link>
);

export default AppBarTab;
