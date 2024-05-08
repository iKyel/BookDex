import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.1.9:5000/api/users/profile"
      );
      setUserData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdateProfile = () => {
    navigation.navigate("UpdateProfile", { fetchUserData });
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://192.168.1.9:5000/api/users/logout");
      // Sau khi đăng xuất, chuyển hướng đến màn hình đăng nhập hoặc màn hình khác
      navigation.navigate('Login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.label}>Username:</Text>
          <Text style={styles.value}>{userData?.username}</Text>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData?.email}</Text>
          {/* Thêm nút để chuyển màn hình */}
          <TouchableOpacity onPress={handleUpdateProfile} style={styles.button}>
            <Text style={styles.buttonText}>Cập nhật thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={[styles.button, { backgroundColor: 'red' }]}>
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});