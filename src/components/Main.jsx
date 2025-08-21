import React from 'react';
import { StyleSheet, View } from 'react-native';
import SignIn from './SignIn';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate, NativeRouter } from 'react-router-native';


const styles = StyleSheet.create({
  container: {
    flex: 1, // removed marginTop because AppBar handles status bar
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Catch-all route redirects to / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );

export default Main;
