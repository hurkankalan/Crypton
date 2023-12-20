import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundArticleImage from "./img/background-article.jpg";
import bitcoinImage from "./img/bitcoin.png";
import bitcoinImage2 from "./img/bitcoin-bezahlen-scaled-546a98.jpg";
import bitcoinImage3 from "./img/bitcoin3.jpg";
import goldVsBitcoinImage from "./img/gold-vs-crypto.png";
import virtualBitcoinImage from "./img/Monnaie-virtuelle-bitcoin.png";
import cryptomonnaie from "./img/cryptomonnaie.jpg";
import crypto from "./img/crypto.jpeg";
import bitcoin_smartphone from "./img/bitcoin_smartphone.jpg";
import blockchain from "./img/blockchain.jpeg";
import "./Article.scss";

// Nombre d'articles à afficher par page
const ArticlesPerPage = 9;

const Article: React.FC = () => {
  // État pour stocker les articles récupérés de l'API
  const [articles, setArticles] = useState([]);

  // État pour la pagination (page actuelle)
  const [currentPage, setCurrentPage] = useState(1);

  // État pour gérer le nouveau mot-clé saisi par l'utilisateur
  const [newKeyword, setNewKeyword] = useState<string>("");

  // État pour stocker les mots-clés actuellement sélectionnés
  const [keywords, setKeywords] = useState<string[]>([]);

  // Charger les mots-clés stockés dans le local storage au montage du composant
  useEffect(() => {
    const storedKeywords = JSON.parse(localStorage.getItem("keywords") || "[]");
    setKeywords(storedKeywords);
  }, []);

  // Gestionnaire pour l'ajout d'un nouveau mot-clé
  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
      localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
      setNewKeyword("");
      fetchArticles(updatedKeywords); // Actualiser les articles
      toast.success("Mot-clé ajouté avec succès");
    }
  };
  
  // Gestionnaire pour la suppression d'un mot-clé existant
  const handleDeleteKeyword = (keywordToDelete: string) => {
    const updatedKeywords = keywords.filter(keyword => keyword !== keywordToDelete);
    setKeywords(updatedKeywords);
    localStorage.setItem("keywords", JSON.stringify(updatedKeywords));
    fetchArticles(updatedKeywords); // Actualiser les articles
    toast.success("Mot-clé supprimé avec succès");
  };

  // Fonction pour récupérer les articles depuis l'API en fonction des mots-clés
  const fetchArticles = async (keywords: string[]) => {
    try {
      let url = "http://localhost:8000/articles/search";
      if (keywords.length > 0) {
        const keywordsParam = keywords.join(",");
        url += `?keyword=${encodeURIComponent(keywordsParam)}`;
      }

      const response = await fetch(url);
      const fetchedArticles = await response.json();

      // Vérifier si la réponse est un tableau
      if (!Array.isArray(fetchedArticles)) {
        console.error("Erreur lors de la récupération des articles:", fetchedArticles.error);
        setArticles([]); // Aucun article à afficher
        return;
      }

      const articlesWithImages = fetchedArticles.map(article => ({
        ...article,
        imageUrl: getRandomImage()
      }));

      setArticles(articlesWithImages);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles:", error);
    }
  };

  // Effectuer la requête API au montage du composant
  useEffect(() => {
    const storedKeywords = JSON.parse(localStorage.getItem("keywords") || "[]");
    setKeywords(storedKeywords);
    fetchArticles(storedKeywords);
  }, []);

  // Fonction pour sélectionner une image aléatoire pour chaque article
  const getRandomImage = () => {
    const images = [
      backgroundArticleImage,
      bitcoinImage,
      bitcoinImage2,
      goldVsBitcoinImage,
      virtualBitcoinImage,
      bitcoinImage3,
      cryptomonnaie,
      crypto,
      bitcoin_smartphone,
      blockchain,
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  // Fonction pour supprimer les balises <img> du résumé de l'article
  const removeImageFromSummary = (htmlContent: string) => {
    return htmlContent.replace(/<img .*?>/g, "");
  };

  // Calculer les index des articles pour la pagination
  const indexOfLastArticle = currentPage * ArticlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - ArticlesPerPage;

  // Découper les articles pour la page actuelle
  const currentArticles = Array.isArray(articles)
    ? articles.slice(indexOfFirstArticle, indexOfLastArticle)
    : [];

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Gérer le cas où aucun article ne correspond au mot-clé
  // 'isKeywordSearch' est 'true' si des mots-clés sont définis,
  // ce qui signifie qu'une recherche par mot-clé a été effectuée.
  const isKeywordSearch = keywords.length > 0;

  // Calculer le nombre total de pages pour la pagination
  const totalPages = Array.isArray(articles)
    ? Math.ceil(articles.length / ArticlesPerPage)
    : 0;

  // Vérifier si des articles sont présents
  const hasArticles = articles.length > 0;
  const noArticlesFound = isKeywordSearch && !hasArticles;

  

  return (
    <>
      <div className="ht__bradcaump__area">
        <div className="ht__bradcaump__container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bradcaump__inner text-center">
                  <h2 className="bradcaump-title">Articles</h2>
                  <div>
                    <input
                      type="text"
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Ajouter un mot-clé"
                    />
                    <button onClick={handleAddKeyword}>Ajouter</button>
                  </div>
                  <div>
                    {keywords.map((keyword, index) => (
                      <span key={index}>
                        {keyword}
                        <button onClick={() => handleDeleteKeyword(keyword)}>
                          <IoCloseCircleSharp />
                        </button>
                      </span>
                    ))}
                    {/* {keywordMessage && (
              <div className="alert alert-info" role="alert">
                {keywordMessage}
              </div>
            )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dg__blog__area bg--white pt--110 pb--140">
  <div className="container">
    {hasArticles ? (
      // Rendu des articles si disponibles
      <div className="row">
        {currentArticles.map((article: any) => (
          // Structure de chaque article
          <div
            key={article.id}
            className="col-lg-4 col-md-6 col-sm-6 col-12"
          >
            <article className="blog__3">
              <div className="thumb">
                <img src={article.imageUrl} alt="" className="article-image" />
              </div>
              <div className="content">
                <div className="bl__author">
                  <div className="author__inner">
                    <h6>{article.source}</h6>
                    <span>
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <h2>
                  <a
                    href={article.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {article.title}
                  </a>
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: removeImageFromSummary(article.summary),
                  }}
                />
              </div>
            </article>
          </div>
        ))}
      </div>
    ) : noArticlesFound ? (
      // Afficher un message si aucun article ne correspond au mot-clé
      <div className="alert alert-info" role="alert">
        Aucun article correspondant au mot-clé "{keywords[0]}" n'a été trouvé.
      </div>
    ) : (
      // Afficher un message si aucun article n'est disponible (sans recherche par mot-clé)
      <div className="alert alert-info" role="alert">
        Aucun article à afficher.
      </div>
    )}
    {hasArticles && (
      // Afficher la pagination si des articles sont présents
      <div className="row mt--40">
        <div className="col-lg-12">
          <ul className="dg__pagination d-flex">
            {[...Array(totalPages).keys()].map((number) => (
              <li key={number + 1}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    paginate(number + 1);
                  }}
                  href="#"
                >
                  {number + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )}
  </div>
</div>

    </>
  );
};

export default Article;