import { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import axios from "axios";

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      // Store token in async storage
      navigation.navigate("Dashboard", { token: res.data.token });
    } catch {
      Alert.alert("Login failed");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={login} />
    </View>
  );
}
