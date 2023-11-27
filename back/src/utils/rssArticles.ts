import cron from 'node-cron';
import Parser from 'rss-parser';
import { Article } from '../types/article';
import articleModels from '../models/article.model';

const parser = new Parser();

const rssFeedUrl = 'https://cryptocurrencynews.com/info/blockchain-101/feed/';

let pressReview: Article[] = [];

const updatePressReview = async () => {
  try {
    const feed = await parser.parseURL(rssFeedUrl);

    pressReview = feed.items.map((item) => ({
      id: item.guid || item.link || '',
      title: item.title || '',
      summary: item.content || item.description || '',
      source: item.creator || '',
      date: item.pubDate || '',
      pageUrl: item.link || '',
      imageUrl: item.enclosure ? item.enclosure.url : undefined,
    }));

    await Promise.all(pressReview.map((article) => articleModels.create(article)));

  } catch (error) {
    console.error('Error updating rss feed:', error.message);
  }
};

cron.schedule('* * * * *', updatePressReview);

updatePressReview();

export const getPressReview = (): Article[] => pressReview;
