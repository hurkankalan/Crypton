import pool from "../database/database.config";
import { User } from "../types/User";

export function getAllUsers() {
  return pool.query("SELECT * FROM users");
}

export function getUserByEmail(email: string) {
  return pool.query("SELECT * FROM users WHERE email = $1", [email]);
}

export function getUserById(id: string) {
  return pool.query("SELECT * FROM users WHERE id = $1", [id]);
}

export function insertUser(user: User) {
  return pool.query(
    "INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4)",
    [user.username, user.email, user.password, user.role]
  );
}

export function updateUser(user: User, id: number) {
  return pool.query(
    "UPDATE users SET username = $1, email = $2, password = $3, role = $4 WHERE id = $5",
    [user.username, user.email, user.password, user.role, id]
  );
}

export function deleteUser(id: number) {
  return pool.query("DELETE FROM users WHERE id = $1", [id]);
}
