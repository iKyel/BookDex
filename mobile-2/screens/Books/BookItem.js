import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity  } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const BookItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('BookDetails', { bookId: item._id })}>
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.cover }} style={styles.itemCover} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemSynopsis}>{item.synopsis}</Text>
          <View style={styles.itemRatingContainer}>
            <Text style={styles.itemRating}>Rating: {item.rating}</Text>
            <Text style={styles.itemPrice}>Price: {item.price}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  itemCover: {
    width: 80,
    height: 120,
    borderRadius: 4,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  itemSynopsis: {
    fontSize: 14,
    marginBottom: 8,
  },
  itemRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemRating: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
