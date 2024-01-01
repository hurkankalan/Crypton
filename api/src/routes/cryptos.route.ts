import Router from "express";
import cryptosControllers from "../controllers/cryptos.controller";
import { isAdmin } from "../middlewares/admin.middleware";
import { verifyToken } from "../middlewares/auth.middleware";

const allCryptoRouter = Router();

allCryptoRouter.get("/", cryptosControllers.getCryptos);
allCryptoRouter.get("/:cmid", cryptosControllers.getCrypto);
allCryptoRouter.get("/:cmid/history/:period", cryptosControllers.getCryptoHistory);
allCryptoRouter.post("/", cryptosControllers.createCrypto);
allCryptoRouter.delete("/:id", cryptosControllers.deleteCrypto);
allCryptoRouter.post("/visibileCryptos", verifyToken, isAdmin, cryptosControllers.getAllCryptosNamesAndVisibilities);
allCryptoRouter.put("/visibility", verifyToken, isAdmin, cryptosControllers.setVisibility);

export default allCryptoRouter;

