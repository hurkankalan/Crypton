import { useEffect, useState } from "react";
import Api from "../api/admin.api";

const AdminSection = () => {
  const [rssLinks, setRssLinks] = useState<any[]>([]);
  const [newRssLink, setNewRssLink] = useState("");
  const [articles, setArticles] = useState<any[]>([]);

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

  const toggleVisibility = async (id: string, isVisibleToGuests: boolean) => {
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
      <input
        type="text"
        value={newRssLink}
        onChange={(e) => setNewRssLink(e.target.value)}
      />
      <button onClick={createRss}>Create RSS Link</button>
      <ul>
        {rssLinks && rssLinks.length > 0 ? (
          rssLinks.map((link) => (
            <li key={link.id}>
              {link.url}
              <button onClick={() => removeRss(link.id)}>Remove</button>
            </li>
          ))
        ) : (
          <p>No RSS links found.</p>
        )}
      </ul>
      <h2>Articles</h2>
      <ul>
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <li key={article.id}>
              {article.title}
              <button
                onClick={() =>
                  toggleVisibility(article.id, article.isVisibleToGuests)
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
    </div>
  );
};

export default AdminSection;
