import React from "react";

export default function Login() {
  return (
    <div style={{ textAlign: "center", paddingTop: "2rem" }}>
      <h2>Connexion</h2>
      <form style={{ display: "inline-block", textAlign: "left" }}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Email : </label>
          <input type="email" name="email" required />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>Mot de passe : </label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}