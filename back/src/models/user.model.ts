import pool from "../database/database.config";
import { User } from "../types/User";

const userModels = {
  getAllUsers() {
    return pool.query("SELECT * FROM user");
  },

  getUserByEmail(email: string) {
    return pool.query("SELECT * FROM user WHERE email = $1", [email]);
  },

  getUserById(id: string) {
    return pool.query("SELECT * FROM user WHERE id = $1", [id]);
  },

  insertUser(user: User) {
    return pool.query(
      "INSERT INTO user (username, email, password, role) VALUES ($1, $2, $3, 'user')",
      [user.username, user.email, user.password]
    );
  },

  updateUser(user: User, id: number) {
    return pool.query(
      "UPDATE user SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5",
      [user.username, user.email, user.password, user.role, id]
    );
  },

  deleteUser(id: number) {
    return pool.query("DELETE FROM user WHERE id = $1", [id]);
  },

  insertUserWithGoogle(user: User) {
    return pool.query(
      "INSERT INTO user (username, email, role) VALUES ($1, $2, 'user')",
      [user.username, user.email]
    );
  },
};

export default userModels;
