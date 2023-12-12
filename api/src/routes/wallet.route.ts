import Router from "express";
import walletControllers from "../controllers/wallet.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const allWalletRouter = Router();

allWalletRouter.get("/", verifyToken, walletControllers.allWallets);
allWalletRouter.get("/:userId", verifyToken, walletControllers.walletByUserId);
allWalletRouter.put(
  "/deposit/money/:userId",
  verifyToken,
  walletControllers.updateAccountAmount
);
allWalletRouter.put(
  "/deposit/bitcoin/:userId",
  verifyToken,
  walletControllers.updateBtcAmount
);

export default allWalletRouter;
