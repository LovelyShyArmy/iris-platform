router.get("/admin/metrics", protect, checkRole(['admin']), async (req, res) => {
  const users = await User.countDocuments();
  const offers = await Offer.countDocuments();

  const last7 = new Date();
  last7.setDate(last7.getDate() - 7);
  const recentOffers = await Offer.countDocuments({ createdAt: { $gte: last7 } });

  const matches = await MatchLog.countDocuments(); // (Optional: log matches)
  const ratings = await User.aggregate([
    { $match: { rating: { $exists: true } } },
    { $group: { _id: null, avg: { $avg: "$rating" } } }
  ]);

  res.json({
    users,
    offers,
    recentOffers,
    matchCount: matches,
    avgRating: ratings[0]?.avg?.toFixed(2) || 0
  });
});
