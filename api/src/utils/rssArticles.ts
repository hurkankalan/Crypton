import cron from "node-cron";
import Parser from "rss-parser";
import { Article } from "../types/article";
import articleModels from "../models/article.model";

const parser = new Parser();

const rssFeedUrls = [
  "https://cryptocurrencynews.com/info/blockchain-101/feed/",
  "https://coinjournal.net/fr/actualites/category/technologie/feed/",
  // "https://coinjournal.net/fr/actualites/tag/bitcoin/feed/",
  // "https://coinjournal.net/fr/actualites/tag/ethereum/feed/",
  // "https://coinjournal.net/fr/actualites/tag/ripple/feed/",
  "https://coinacademy.fr/tag/analyse-crypto/feed/",
];

let pressReview: Article[] = [];

const updatePressReview = async () => {
  try {
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

cron.schedule("0 0 * * *", updatePressReview);

updatePressReview();

export const getPressReview = (): Article[] => pressReview;
