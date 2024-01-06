import pool from "../database/database.config";
import { QueryResult } from "pg";
import { Wallet } from "../types/Wallet";

const walletModels = {
  getAllWallets(): Promise<QueryResult<Wallet>> {
    return pool.query("SELECT * FROM wallet");
  },

  getWalletByUserId(userId: number): Promise<QueryResult<Wallet>> {
    return pool.query("SELECT * FROM wallet WHERE usersId = $1", [userId]);
  },

  createWallet(usersId: number): Promise<QueryResult> {
    return pool.query("INSERT INTO wallet (usersId) VALUES ($1)", [usersId]);
  },

  updateAccountAmount(accountAmount: number, id: number): Promise<QueryResult> {
    return pool.query("UPDATE wallet SET accountAmount = $1 WHERE usersid = $2", [
      accountAmount,
      id,
    ]);
  },

  updateBtcAmount(btcAmount: number, id: number): Promise<QueryResult> {
    return pool.query("UPDATE wallet SET btcAmount = $1 WHERE usersid = $2", [
      btcAmount,
      id,
    ]);
  },
};

export default walletModels;
