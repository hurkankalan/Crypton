import { SetStateAction, useEffect, useState } from "react";
import Api from "../api/admin.api";
import "./AdminSection.scss";

const AdminSection = () => {
  const [rssLinks, setRssLinks] = useState<any[]>([]);
  const [newRssLink, setNewRssLink] = useState("");
  const [articles, setArticles] = useState<any[]>([]);
  const [cryptos, setCryptos] = useState<any[]>([]);



  const [currentPage, setCurrentPage] = useState(1);
  const cryptosPerPage = 10; // Change this to the number of cryptos you want per page

  const indexOfLastCrypto = currentPage * cryptosPerPage;
  const indexOfFirstCrypto = indexOfLastCrypto - cryptosPerPage;
  const currentCryptos = cryptos.slice(indexOfFirstCrypto, indexOfLastCrypto);

  const totalPages = Math.ceil(cryptos.length / cryptosPerPage);

  const handlePageChange = (pageNumber: SetStateAction<number> ) => setCurrentPage(pageNumber);


  useEffect(() => {
    const fetchCryptos = async () => {
      try {
        const cryptos = await Api.getVisibleCryptos();
        setCryptos(cryptos);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCryptos();
  }, []);

  const toggleCryptoVisibility = async (id: string, isVisible: boolean) => {
    try {
      await Api.setCryptoVisibility(id, !isVisible);
      setCryptos((prevCryptos) =>
        prevCryptos.map((crypto) =>
          crypto.id === id ? { ...crypto, isvisibletoguests: !isVisible } : crypto
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articles = await Api.getVisibleArticles();
        setArticles(articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  const toggleArticleVisibility = async (id: string, isVisibleToGuests: boolean) => {
    try {
      await Api.setVisibility(id, !isVisibleToGuests);
      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article.id === id ? { ...article, visible: !isVisibleToGuests } : article
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchRssLinks = async () => {
      try {
        const links = await Api.getRssLinks();
        setRssLinks(links);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRssLinks();
  }, []);

  const createRss = async () => {
    try {
      const link = await Api.createRssLink(newRssLink);
      setRssLinks([...rssLinks, link]);
      setNewRssLink("");
    } catch (error) {
      console.error(error);
    }
  };

  const removeRss = async (id: any) => {
    try {
      await Api.deleteRssLink(id);
      setRssLinks(rssLinks.filter((link) => link.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="adminSection">
      <h1>Admin Section</h1>
      <h2>RSS Links:</h2>
      <input
        type="text"
        value={newRssLink}
        onChange={(e) => setNewRssLink(e.target.value)}
        placeholder="Enter RSS link"
      />
      <button onClick={createRss}>Create RSS Link</button>
      <ul>
        {rssLinks && rssLinks.length > 0 ? (
          rssLinks.map((link) => (
            <li key={link.id} className="rssLink">
              {link.url}
              <button onClick={() => removeRss(link.id)}>Remove</button>
            </li>
          ))
        ) : (
          <p>No RSS links found.</p>
        )}
      </ul>
      <h3>Articles:</h3>
      <ul>
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id} className="articleItem">
              {article.title}
              <button
                onClick={() =>
                  toggleArticleVisibility(article.id, article.isVisibleToGuests)
                }
              >
                {article.visible ? "Hide" : "Show"}
              </button>
            </li>
          ))
        ) : (
          <p>No articles found.</p>
        )}
      </ul>
      <h4>Cryptos:</h4>
      <ul>
        {currentCryptos && currentCryptos.length > 0 ? (
          currentCryptos.map((crypto) => (
            <li key={crypto.id} className="cryptoItem">
              <img src={crypto.imageurl} alt={crypto.name} className="logo-crypto" />
              {crypto.name}
              <button
                onClick={() =>
                  toggleCryptoVisibility(crypto.id, crypto.isvisibletoguests)
                }
              >
                {crypto.isvisibletoguests ? "Hide" : "Show"}
              </button>
            </li>
          ))
        ) : (
          <p>No cryptos found.</p>
        )}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
      {/* <ul>
        {cryptos && cryptos.length > 0 ? (
          cryptos.map((crypto) => (
            <li key={crypto.id} className="cryptoItem">
              <img src={crypto.imageurl} alt={crypto.name} className="logo-crypto" />
              {crypto.name}
              <button
                onClick={() =>
                  toggleCryptoVisibility(crypto.id, crypto.isvisibletoguests)
                }
              >
                {crypto.isvisibletoguests ? "Hide" : "Show"}
              </button>
            </li>
          ))
        ) : (
          <p>No cryptos found.</p>
        )}
      </ul> */}
    </div>
  );
};

export default AdminSection;
