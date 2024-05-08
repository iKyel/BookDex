import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';

const BookDetails = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://192.168.1.9:5000/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };
    fetchBook();
  }, [bookId]);

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: book.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.author}>by {book.author}</Text>
        <Text style={styles.synopsis}>{book.synopsis}</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Publisher:</Text> {book.publisher}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Pages:</Text> {book.number_of_pages}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Rating:</Text> {book.rating}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Price:</Text> ${book.price}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>Reviews:</Text> {book.numReviews}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.bold}>In Stock:</Text> {book.countInStock}
          </Text>
        </View>
        <Text style={styles.reviewsTitle}>Reviews</Text>
        {book.reviews.map((review) => (
          <View key={review._id} style={styles.reviewContainer}>
            <Text style={styles.reviewName}>{review.name}</Text>
            <Text style={styles.reviewText}>{review.comment}</Text>
            <Text style={styles.reviewRating}>
              <Text style={styles.bold}>Rating:</Text> {review.rating}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  synopsis: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  reviewsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  reviewContainer: {
    backgroundColor: '#f8f8f8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  reviewName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  reviewRating: {
    fontSize: 16,
  },
});

export default BookDetails;