import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import axios from "axios";
import BookItem from "./Books/BookItem";

const AllBookScreen = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.9:5000/api/books");
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Tất Cả Sách</Text>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <BookItem item={item} />}
      />
    </View>
  );
};

export default AllBookScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
    fontStyle: "italic",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
});
