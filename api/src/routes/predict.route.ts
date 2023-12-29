import Router from "express";
import predictController from "../controllers/predict.controller";

const predictRouter = Router();

predictRouter.get('/predict', predictController.getPredictions);

export default predictRouter;
