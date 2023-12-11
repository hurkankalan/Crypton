import cron from "node-cron";
import Parser from "rss-parser";
import { Article } from "../types/article";
import articleModels from "../models/article.model";
import rssModels from "../models/rss.model";

const parser = new Parser();

const getRssUrls = async () => {
  try {
    const rss = await rssModels.getAll();
    return rss.map((rss) => rss.url);
  } catch (error) {
    console.error("Error getting rss urls:", error);
    return [];
  }
}

// const rssFeedUrls = [
//   "https://cryptocurrencynews.com/info/blockchain-101/feed/",
//   "https://coinjournal.net/fr/actualites/category/technologie/feed/",
//   "https://coinacademy.fr/tag/analyse-crypto/feed/",
// ];

let pressReview: Article[] = [];

const updatePressReview = async () => {
  try {
    const rssFeedUrls = await getRssUrls();
    for (const url of rssFeedUrls) {
      const feed = await parser.parseURL(url);
      const articles = feed.items.map((item) => ({
        id: item.guid || item.link || "",
        title: item.title || "",
        summary: item.content || item.description || "",
        source: item.creator || "",
        date: item.pubDate || "",
        pageUrl: item.link || "",
        imageUrl: item.enclosure ? item.enclosure.url : undefined,
      }));
      pressReview = pressReview.concat(articles);
      await Promise.all(
        articles.map((article) => articleModels.create(article))
      );
    }
    console.log("Rss feed updated");
  } catch (error) {
    console.error("Error updating rss feed:", error);
  }
};

cron.schedule("*/1 * * * *", updatePressReview);

updatePressReview();

export const getPressReview = (): Article[] => pressReview;
