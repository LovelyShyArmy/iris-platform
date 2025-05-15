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

export function scoreMatchVerbose(offer, supplier, audit) {
  const breakdown = {};
  let score = 0;

  breakdown.industry = offer.industry === supplier.industry ? 30 : 0;
  score += breakdown.industry;

  breakdown.type = (offer.type === "need" && supplier.role === "supplier") ? 10 : 0;
  score += breakdown.type;

  const goodCerts = ["ISO 9001", "AS9100", "ISO 45001"];
  const matchedCerts = audit?.certifications?.filter(c => goodCerts.includes(c)) || [];
  breakdown.certifications = Math.min(15, matchedCerts.length * 5);
  score += breakdown.certifications;

  breakdown.audit = Math.min(10, (audit?.totalScore || 0) / 10);
  score += breakdown.audit;

  breakdown.availability = supplier.available ? 10 : 0;
  score += breakdown.availability;

  const deadline = new Date(offer.deadline);
  const now = new Date();
  const days = (deadline - now) / (1000 * 3600 * 24);
  breakdown.deadlineFit = days < 30 ? 10 : 0;
  score += breakdown.deadlineFit;

  breakdown.rating = (supplier.rating || 0) * 2;
  score += breakdown.rating;

  breakdown.sectorTag = (supplier.tags || []).includes(offer.industry) ? 5 : 0;
  score += breakdown.sectorTag;

  return {
    score: Math.min(100, Math.round(score)),
    breakdown
  };
}

await logEvent(req.user._id, "match_run", `Offer: ${offer._id}`);
