export const calculateScore = ({ certifications }) => {
  const knownCerts = ['ISO 9001', 'AS9100', 'ISO 45001'];
  const complianceScore = certifications.filter(c => knownCerts.includes(c)).length * 10;
  const capacityScore = Math.floor(Math.random() * 51); // Mocking capacity score (0–50)
  const totalScore = Math.min(100, complianceScore + capacityScore);
  return { complianceScore, capacityScore, totalScore };
};
