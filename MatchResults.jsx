{match.breakdown && (
  <details className="mt-2 text-sm">
    <summary className="cursor-pointer text-blue-600">📊 Détails du match</summary>
    <ul className="ml-4 list-disc">
      {Object.entries(match.breakdown).map(([key, val]) => (
        <li key={key}>{key}: +{val} points</li>
      ))}
    </ul>
  </details>
)}
