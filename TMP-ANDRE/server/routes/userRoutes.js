router.post("/push-token", protect, async (req, res) => {
  const { token } = req.body;
  const user = await User.findById(req.user.id);
  user.pushToken = token;
  await user.save();
  res.send("Token saved");
});
