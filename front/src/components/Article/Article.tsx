import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Article.scss";

// Nombre d'articles à afficher par page
const ArticlesPerPage = 9;

const Article: React.FC = () => {
  // 'articles' stocke la liste des articles récupérés de l'API
  const [articles, setArticles] = useState([]);
  // 'currentPage' garde la trace de la page actuelle pour la pagination
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect est utilisé pour exécuter le code lors du montage du composant
  useEffect(() => {
    // Définition d'une fonction asynchrone pour récupérer les articles
    const fetchArticles = async () => {
      try {
        // Appel de l'API pour récupérer les articles
        const response = await fetch("http://localhost:8000/articles/search");
        const data = await response.json(); // Transformation de la réponse en JSON
        setArticles(data); // Mise à jour de l'état 'articles' avec les données récupérées
        console.log(data); // Affiche les données dans la console
      } catch (error) {
        // Gestion des erreurs en cas d'échec de l'appel API
        console.error("Erreur lors de la récupération des articles:", error);
      }
    };

    fetchArticles(); // Appel de la fonction pour récupérer les articles
  }, []);

  const extractImageUrl = (htmlContent: string) => {
    const regex = /<img.*?src=["'](.*?)["']/; // Regex pour trouver la balise img et capturer l'URL
    const match = htmlContent.match(regex);
    return match ? match[1] : null; // Retourne l'URL de l'image ou null si aucune image n'est trouvée
  };

  const removeImageFromSummary = (htmlContent: string) => {
    const regex = /<img.*?src=["'].*?["'].*?>/; // Regex pour trouver et retirer la balise img
    return htmlContent.replace(regex, ""); // Remplace la balise img par une chaîne vide
  };

  // Calcul de l'index du dernier et du premier article pour la pagination
  const indexOfLastArticle = currentPage * ArticlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - ArticlesPerPage;
  // Obtention des articles actuels à afficher sur la page
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Fonction pour changer de page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="ht__bradcaump__area">
        <div className="ht__bradcaump__container">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="bradcaump__inner text-center">
                  <h2 className="bradcaump-title">Articles</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dg__blog__area bg--white pt--110 pb--140">
        <div className="container">
          <div className="row">
            {currentArticles.map((article: any) => (
              <div
                key={article.id}
                className="col-lg-4 col-md-6 col-sm-6 col-12"
              >
                <article className="blog__3">
                  <div className="thumb">
                    <Link to={article.pageUrl}>
                      <img src={extractImageUrl(article.summary)} alt="" />
                    </Link>
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
          <div className="row mt--40">
            <div className="col-lg-12">
              {/* Pagination */}
              <ul className="dg__pagination d-flex">
                {[
                  ...Array(Math.ceil(articles.length / ArticlesPerPage)).keys(),
                ].map((number) => (
                  <li key={number + 1}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        paginate(number + 1);
                      }}
                      href="#!"
                    >
                      {number + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
