import pool from "../database/database.config";
import { QueryResult } from "pg";
import { User, UserGoogle, NewUser } from "../types/User";

const userModels = {
  getAllUsers(): Promise<QueryResult<User>> {
    return pool.query("SELECT * FROM users");
  },

  getUserById(id: string): Promise<QueryResult<User>> {
    return pool.query("SELECT * FROM users WHERE id = $1", [id]);
  },

  insertUser(user: User): Promise<QueryResult<User>> {
    return pool.query(
      "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, 'user')",
      [user.username, user.email, user.password]
    );
  },

  updateUser(user: NewUser, id: number): Promise<QueryResult<User>> {
    return pool.query(
      "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4",
      [user.username, user.email, user.password, id]
    );
  },

  deleteUser(id: number): Promise<QueryResult<User>> {
    return pool.query("DELETE FROM users WHERE id = $1", [id]);
  },

  insertUserWithGoogle(user: User): Promise<QueryResult<UserGoogle>> {
    return pool.query(
      "INSERT INTO users (username, email, role) VALUES ($1, $2, 'user')",
      [user.username, user.email]
    );
  },
};

export default userModels;
