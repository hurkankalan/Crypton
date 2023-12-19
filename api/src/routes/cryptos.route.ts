import Router from "express";
import cryptosControllers from "../controllers/cryptos.controller";

const allCryptoRouter = Router();

allCryptoRouter.get("/", cryptosControllers.getCryptos);
allCryptoRouter.get("/:cmid", cryptosControllers.getCrypto);
allCryptoRouter.get("/:cmid/history/:period", cryptosControllers.getCryptoHistory);
allCryptoRouter.post("/", cryptosControllers.createCrypto);
allCryptoRouter.delete("/:cmid", cryptosControllers.deleteCrypto);

export default allCryptoRouter;

