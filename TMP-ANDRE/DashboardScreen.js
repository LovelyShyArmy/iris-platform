import { useEffect } from "react";
import { io } from "socket.io-client";
import { Alert } from "react-native";

export default function Dashboard({ route }) {
  const { token } = route.params;

  useEffect(() => {
    const socket = io("http://localhost:5000");
    const userId = JSON.parse(atob(token.split('.')[1])).id;
    socket.emit("register", userId);

    socket.on("notification", (data) => {
      Alert.alert("🔔 Notification", data.text);
    });
  }, []);

  return (...);
}
