import express from "express";
import { Request, Response } from "express";
import cookie from "cookie-parser";
import userRouter from "./routes/index.route";
import predictRouter from "./routes/predict.route"; 
import cors from 'cors';
import { getPressReview } from "./utils/rssArticles";
import { getCrypto } from "./utils/apiCrypto";

const app = express();
const port = 8000;

app.use(cors({ credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

// Utilisez les routeurs ici
app.use(userRouter);
app.use('/api', predictRouter); 

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Crypton !");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} 🚀`);
  getPressReview();
  getCrypto();
});
