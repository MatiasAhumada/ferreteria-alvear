import { Role, User } from "@prisma/client";

export type { User, Role };

export type LoginDto = Pick<User, "username" | "password">;

export interface AuthUser {
  id: string;
  username: string;
  role: Role;
}

export interface JwtPayload {
  userId: string;
  username: string;
  role: Role;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}
