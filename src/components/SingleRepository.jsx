import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import RepositoryItem from './RepositoryItem';
import { format } from 'date-fns';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e1e4e8' },
  separator: { height: 10 },
  reviewContainer: { padding: 10, backgroundColor: 'white', flexDirection: 'row' },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ratingText: { color: '#0366d6', fontWeight: 'bold' },
  reviewContent: { flex: 1 },
  username: { fontWeight: 'bold', marginBottom: 2 },
  date: { color: '#586069', marginBottom: 4 },
  text: {},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const ReviewItem = ({ review }) => (
  <View style={styles.reviewContainer}>
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>
    <View style={styles.reviewContent}>
      <Text style={styles.username}>{review.user.username}</Text>
      <Text style={styles.date}>
        {format(new Date(review.createdAt), 'dd.MM.yyyy')}
      </Text>
      <Text style={styles.text}>{review.text}</Text>
    </View>
  </View>
);

export const SingleRepositoryContainer = ({ repository, fetchMoreReviews }) => {
  const reviewNodes = repository.reviews?.edges.map(edge => edge.node) || [];

  const handleEndReached = () => {
    if (repository.reviews.pageInfo.hasNextPage) {
      fetchMoreReviews({
        variables: { after: repository.reviews.pageInfo.endCursor },
      });
    }
  };

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ListHeaderComponent={() => <RepositoryItem item={repository} showGitHubButton />}
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 5 },
  });

  if (loading) return <Text style={{ padding: 10 }}>Loading repository...</Text>;
  if (error) return <Text style={{ padding: 10 }}>Error loading repository</Text>;

  return (
    <View style={styles.container}>
      {data?.repository && (
        <SingleRepositoryContainer
          repository={data.repository}
          fetchMoreReviews={fetchMore}
        />
      )}
    </View>
  );
};

export default SingleRepository;
