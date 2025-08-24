import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Alert } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { ME } from '../graphql/queries';
import { useNavigate } from 'react-router-native';
import { format } from 'date-fns';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e1e4e8' },
  separator: { height: 10 },
  reviewContainer: {
    padding: 10,
    backgroundColor: 'white',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  ratingText: { color: '#0366d6', fontWeight: 'bold' },
  reviewContent: { flex: 1 },
  repositoryName: { fontWeight: 'bold', marginBottom: 2 },
  date: { color: '#586069', marginBottom: 4 },
  text: {},
  buttonsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 },
});

const ItemSeparator = () => <View style={styles.separator} />;

/* -------------------- Pure Review Item -------------------- */
export const ReviewItem = ({ review, refetch }) => {
  const navigate = useNavigate();
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const handleViewRepository = () => {
    navigate(`/repository/${review.repository.id}`);
  };

  const handleDeleteReview = async () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await deleteReview({ variables: { id: review.id } });
            refetch();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.reviewContent}>
        <Text style={styles.repositoryName}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.text}>{review.text}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable onPress={handleViewRepository}>
            <Text style={{ color: '#0366d6' }}>View repository</Text>
          </Pressable>
          <Pressable onPress={handleDeleteReview}>
            <Text style={{ color: 'red' }}>Delete review</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

/* -------------------- Pure Container -------------------- */
export const MyReviewsContainer = ({ reviews, refetch }) => {
  const reviewNodes = reviews?.edges.map(edge => edge.node) || [];

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
    />
  );
};

/* -------------------- Component with side effect -------------------- */
const MyReviews = () => {
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  });

  if (loading) return <Text style={{ padding: 10 }}>Loading reviews...</Text>;
  if (error) return <Text style={{ padding: 10 }}>Error loading reviews</Text>;

  return (
    <View style={styles.container}>
      {data?.me?.reviews && (
        <MyReviewsContainer reviews={data.me.reviews} refetch={refetch} />
      )}
    </View>
  );
};

export default MyReviews;
