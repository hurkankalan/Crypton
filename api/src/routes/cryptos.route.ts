import Router from "express";
import cryptosControllers from "../controllers/cryptos.controller";
import { isAdmin } from "../middlewares/admin.middleware";
import { verifyToken } from "../middlewares/auth.middleware";
import { isGuest } from "../middlewares/guest.middleware";

const allCryptoRouter = Router();

allCryptoRouter.get("/", isGuest, cryptosControllers.getCryptos);
allCryptoRouter.get("/:cmid", isGuest, cryptosControllers.getCrypto);
allCryptoRouter.get("/:cmid/history/:period", isGuest, cryptosControllers.getCryptoHistory);
allCryptoRouter.post("/", cryptosControllers.createCrypto);
allCryptoRouter.delete("/:id", cryptosControllers.deleteCrypto);
allCryptoRouter.put("/visibility", verifyToken, isAdmin, cryptosControllers.setVisibility);

export default allCryptoRouter;

