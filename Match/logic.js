import { sendEmail } from "../utils/emailSender.js";

await sendEmail(
  supplier.email,
  "🚀 Nouveau Match sur IRIS",
  `<p>Vous avez été sélectionné pour répondre à une demande dans votre secteur: <b>${offer.industry}</b>.</p><p>Connectez-vous sur IRIS pour voir les détails.</p>`
);
