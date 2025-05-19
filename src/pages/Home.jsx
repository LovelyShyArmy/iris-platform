import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <header className="bg-gray-100 text-center py-20 px-4">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">Bienvenue sur IRIS</h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          La plateforme qui connecte les entreprises entre elles pour échanger des services, produits et opportunités.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          Rejoindre la plateforme
        </Link>
      </header>

      {/* How it works */}
      <section className="py-16 px-4 bg-white text-center">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Comment ça fonctionne ?</h2>
        <ul className="space-y-4 text-lg text-gray-600 max-w-xl mx-auto text-left">
          <li>🧩 Créez votre profil entreprise.</li>
          <li>📢 Publiez des offres ou des besoins.</li>
          <li>🔍 Utilisez les filtres pour rechercher des partenaires potentiels.</li>
          <li>🤝 Entrez en contact avec les entreprises compatibles grâce au système de matching.</li>
        </ul>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Ce que vous pouvez faire</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto text-gray-700">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Créer un profil</h3>
            <p>Présentez votre entreprise et vos services/produits.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Publier des annonces</h3>
            <p>Déposez vos offres ou demandes spécifiques.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Matching intelligent</h3>
            <p>Notre algorithme vous propose les partenaires les plus adaptés.</p>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-xl font-semibold mb-2">Connexion simplifiée</h3>
            <p>Contactez directement d'autres entreprises depuis la plateforme.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-600 text-sm">
        <Link to="/pricing" className="text-blue-600 hover:underline mx-2">Voir les tarifs</Link> |
        <Link to="/login" className="text-blue-600 hover:underline mx-2">Se connecter</Link>
      </footer>
    </div>
  );
};

export default Home;
