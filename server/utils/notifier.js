import Notification from "../models/Notification.js";

export const sendNotification = async (userId, type, message) => {
  await Notification.create({ user: userId, type, message });
};
