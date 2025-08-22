import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fullName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    color: '#586069',
    marginBottom: 5,
  },
  language: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  statLabel: {
    color: '#586069',
  },
});

const formatCount = (count) => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count;
};

const RepositoryItem = ({ item }) => {
  // Defaults for missing fields
  const {
    fullName = 'N/A',
    description = 'No description',
    language = 'Unknown',
    forksCount = 0,
    stargazersCount = 0,
    ratingAverage = 0,
    reviewCount = 0,
    ownerAvatarUrl,
  } = item || {};

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {ownerAvatarUrl ? (
          <Image style={styles.avatar} source={{ uri: ownerAvatarUrl }} />
        ) : null}
        <View style={styles.infoContainer}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatCount(stargazersCount)}</Text>
          <Text style={styles.statLabel}>Stars</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{formatCount(forksCount)}</Text>
          <Text style={styles.statLabel}>Forks</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{reviewCount}</Text>
          <Text style={styles.statLabel}>Reviews</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{ratingAverage}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
};

export default RepositoryItem;
