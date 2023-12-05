import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Article.scss";
import articlesData from "./articles.json"; // Assurez-vous que le chemin est correct

const ArticlesPerPage = 9; // Définir le nombre d'articles par page

const Article: React.FC = () => {
  // État pour suivre la page actuelle
  const [currentPage, setCurrentPage] = useState(1);

  // Calcul de l'index du dernier article sur la page actuelle
  const indexOfLastArticle = currentPage * ArticlesPerPage;

  // Calcul de l'index du premier article sur la page actuelle
  const indexOfFirstArticle = indexOfLastArticle - ArticlesPerPage;

  // Sélection des articles à afficher sur la page actuelle
  const currentArticles = articlesData.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Fonction pour changer la page courante et remonter au début de la page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0, // Remonte tout en haut de la page
      behavior: "smooth", // Animation douce
    });
  };

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
            {currentArticles.map((article) => (
              // Génération de chaque article
              <div
                key={article.id}
                className="col-lg-4 col-md-6 col-sm-6 col-12"
              >
                <article className="blog__3">
                  <div className="thumb">
                    <Link to={article.pageUrl}>
                      <img src={article.imageUrl} alt="author images" />
                    </Link>
                  </div>
                  <div className="content">
                    <div className="bl__author">
                      <div className="author__inner">
                        <h6>{article.source}</h6>
                        <span>{article.date}</span>
                      </div>
                    </div>
                    <h2>
                      <Link to={article.pageUrl}>{article.title}</Link>
                    </h2>
                    <p>{article.summary}</p>
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
                  ...Array(
                    Math.ceil(articlesData.length / ArticlesPerPage)
                  ).keys(),
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
