import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Pressable,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const [username, SetUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigation = useNavigation()
  const handleRegister = () => {
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    axios
      .post("http://192.168.1.9:5000/api/users/", newUser)
      .then((response) => {
        console.log(response);
        Alert.alert("Đăng ký thành công");
        setEmail("");
        setPassword("");
        navigation.replace("Login")
      })
      .catch((error) => {
        Alert.alert("Đăng ký thất bại", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên người dùng"
        value={username}
        onChangeText={SetUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Đăng Ký</Text>
      </TouchableOpacity>

      <Pressable>
        <Text>Đã có tài khoản? Đăng Nhập</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
