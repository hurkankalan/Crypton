import './../styles/scss/component/home.scss'

export default function Home() {
  const backgroundImageUrl = 'https://wallpapercosmos.com/w/full/0/2/9/101775-3840x2160-desktop-4k-cryptocurrency-wallpaper-photo.jpg';

  return (
    <>
      <div className="home-container" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
        <div className="welcome-message">
          <h1>Bienvenue sur Crypton !</h1>
          <p>Votre source quotidienne d'informations sur les cryptomonnaies.</p>
        </div>
        <div className="features">
          <div className="feature-announcement">
            <h2>Découvrez Prophet !</h2>
            <p>
              Entrez dans l'ère de la prévision avec Prophet, notre outil révolutionnaire qui utilise des algorithmes de pointe pour anticiper les tendances du Bitcoin. Ne laissez plus le hasard guider vos investissements : avec Prophet, bénéficiez d'analyses prédictives basées sur des données massives et une intelligence artificielle sophistiquée. Les prédictions à sept jours ouvrent une fenêtre sur l'avenir, vous permettant d'agir avec stratégie et confiance. Rejoignez la communauté des utilisateurs avisés qui font un pas de géant dans le trading de cryptomonnaies.
            </p>
          </div>
          <div className="feature-announcement">
            <h2>Explorez nos Articles</h2>
            <p>
              La page Articles de Crypton est votre bibliothèque dynamique de connaissances. Ici, chaque mot-clé vous déverrouille un univers d'articles triés sur le volet, couvrant les innovations, les analyses de marché, et les perspectives d'experts. Naviguez à travers les sujets brûlants du moment ou plongez dans des analyses de fond pour une compréhension approfondie des mécanismes des cryptomonnaies. Notre moteur de recherche intuitif et nos filtres intelligents vous permettent de rester toujours informé et en avance sur les dernières évolutions du marché.
            </p>
          </div>
          <div className="feature-announcement">
            <h2>Gérez votre Wallet</h2>
            <p>
              La page Wallet de Crypton redéfinit la manière dont vous achetez et gérez vos cryptomonnaies. Intuitive, sécurisée et directement intégrée à votre compte, elle offre une plateforme robuste pour vos transactions. Que vous soyez débutant ou trader expérimenté, notre Wallet est conçu pour vous donner le contrôle total de votre portefeuille numérique. Achetez, vendez, échangez, et suivez vos investissements en cryptomonnaies avec une facilité déconcertante. C'est l'outil indispensable pour tout investisseur qui se respecte dans le monde numérique d'aujourd'hui.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}