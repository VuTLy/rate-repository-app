import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import SignIn from './SignIn';
import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import AppBar from './AppBar';
import ReviewForm from './ReviewForm';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => (
  <View style={styles.container}>
    <AppBar />
    <Routes>
      <Route path="/" element={<RepositoryList />} />
      <Route path="/repository/:id" element={<SingleRepository />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/create-review" element={<ReviewForm />} />
      <Route path="/my-reviews" element={<MyReviews />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </View>
);

export default Main;
