import AnalyticsLog from "../models/AnalyticsLog.js";

export const logEvent = async (userId, type, detail = "") => {
  await AnalyticsLog.create({ user: userId, type, detail });
};
