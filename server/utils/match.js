export function scoreMatch(offer, supplier, audit) {
  let score = 0;

  // 1. Industry Match (30 pts)
  if (supplier.industry === offer.industry) score += 30;

  // 2. Type Compatibility (10 pts)
  if (offer.type === "need" && supplier.role === "supplier") score += 10;

  // 3. Certifications (15 pts)
  const goodCerts = ["ISO 9001", "AS9100", "ISO 45001"];
  const matchedCerts = audit?.certifications?.filter(c => goodCerts.includes(c)) || [];
  score += Math.min(15, matchedCerts.length * 5);

  // 4. Audit Score (10 pts)
  score += Math.min(10, (audit?.totalScore || 0) / 10);

  // 5. Availability Badge (10 pts)
  if (supplier.available === true) score += 10;

  // 6. Deadline Fit (10 pts)
  const offerDeadline = new Date(offer.deadline);
  const today = new Date();
  if (offerDeadline > today && (offerDeadline - today) / (1000 * 3600 * 24) < 30) {
    score += 10;
  }

  // 7. Client Satisfaction (10 pts)
  const satisfaction = supplier.rating || 0; // Out of 5
  score += satisfaction * 2; // 0–10

  // 8. Past Sector Tags (5 pts)
  const relevant = (supplier.tags || []).includes(offer.industry);
  if (relevant) score += 5;

  return Math.min(100, Math.round(score));
}
