export const AUTH_CONSTANTS = {
  JWT_SECRET: process.env.JWT_SECRET!,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN!,
  BCRYPT_SALT_ROUNDS: 10,
  TOKEN_COOKIE_NAME: "auth_token",
} as const;

export const AUTH_MESSAGES = {
  LOGIN_SUCCESS: "Inicio de sesión exitoso",
  LOGOUT_SUCCESS: "Sesión cerrada exitosamente",
  INVALID_CREDENTIALS: "Credenciales inválidas",
  USER_NOT_FOUND: "Usuario no encontrado",
  USERNAME_ALREADY_EXISTS: "El nombre de usuario ya está registrado",
  UNAUTHORIZED: "No autorizado",
  TOKEN_EXPIRED: "Token expirado",
  TOKEN_INVALID: "Token inválido",
  INSUFFICIENT_PERMISSIONS: "Permisos insuficientes",
} as const;
