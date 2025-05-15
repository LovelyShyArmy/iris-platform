await sendEmail(
  supplier.email,
  "⭐ Nouvelle évaluation reçue",
  `<p>Vous avez été noté(e) par un acheteur.</p><p>Score: ${stars}/5</p>`
);

await logEvent(req.user._id, "rating_given", `Rated: ${supplierId}`);
