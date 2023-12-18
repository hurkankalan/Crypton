import pool from "../database/database.config";
import { QueryResult } from "pg";
import { User, UserDiscord } from "../types/User";

const userModels = {
  getAllUsers(): Promise<QueryResult<User>> {
    return pool.query("SELECT * FROM users");
  },

  getUserById(id: number): Promise<QueryResult<User>> {
    return pool.query("SELECT * FROM users WHERE id = $1", [id]);
  },

  getUserByEmail(email: string): Promise<QueryResult<User>> {
    return pool.query("SELECT * FROM users WHERE email = $1", [email]);
  },

  insertUser(user: User): Promise<QueryResult<User>> {
    return pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [user.username, user.email, user.password]
    );
  },

  updateUser(user: User): Promise<QueryResult<User>> {
    return pool.query(
      "UPDATE users SET username = $1, email = $2, password = $3, currency = $4 WHERE id = $5",
      [user.username, user.email, user.password, user.currency, user.id]
    );
  },

  deleteUser(id: number): Promise<QueryResult<User>> {
    return pool.query("DELETE FROM users WHERE id = $1", [id]);
  },

  insertUserWithDiscord(user: User): Promise<QueryResult<UserDiscord>> {
    return pool.query(
      "INSERT INTO users (username, email, connectType) VALUES ($1, $2, $3)",
      [user.username, user.email, 1]
    );
  },

  updateDefaultCurrency(currency: string, id: number): Promise<QueryResult> {
    return pool.query("UPDATE users SET currency = $1 WHERE id = $2", [
      currency,
      id,
    ]);
  },
};

export default userModels;
