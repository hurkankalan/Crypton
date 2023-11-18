import express from "express";
import { Request, Response } from "express";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Crypton !");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port} 🚀`);
});
