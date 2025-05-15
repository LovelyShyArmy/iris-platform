export const matchEmailTemplate = (name, industry, dashboardUrl) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color:#0066cc">🚀 Bonjour ${name},</h2>
    <p>Vous avez été sélectionné pour une opportunité dans le secteur <strong>${industry}</strong>.</p>
    <p>
      Cliquez ici pour voir les détails et répondre à l'offre :
      <a href="${dashboardUrl}" style="color:#0066cc">Accéder à IRIS</a>
    </p>
    <hr/>
    <p style="font-size:12px; color:gray;">IRIS – Plateforme de sourcing industriel</p>
  </div>
`;
