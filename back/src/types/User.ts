export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
};

export type NewUser = Omit<User, "id" | "role">;

export type UserGoogle = Omit<User, "role" | "password" | "id">;
