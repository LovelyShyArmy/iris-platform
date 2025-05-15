import axios from "axios";

export const sendPushNotification = async (expoPushToken, title, body) => {
  await axios.post("https://exp.host/--/api/v2/push/send", {
    to: expoPushToken,
    sound: "default",
    title,
    body
  });
};
