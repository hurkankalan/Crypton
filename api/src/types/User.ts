export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role?: "user" | "admin";
  currency?: "EUR" | "USD";
  accountAmount?: number;
  btcAmount?: number;
};

export type UserDiscord = Omit<User, "role" | "password" | "id">;
