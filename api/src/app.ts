import express from "express";
import { Request, Response } from "express";
import cookie from "cookie-parser";
import userRouter from "./routes/index.route";
import cors from 'cors';
import { getPressReview } from "./utils/rssArticles";

const app = express();
const port = 8000;

// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:3001' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());
app.use(userRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Crypton !");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} 🚀`);
  getPressReview();
});
