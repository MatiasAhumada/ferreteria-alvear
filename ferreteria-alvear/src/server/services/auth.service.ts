import { AuthRepository } from "../repository/auth.repository";
import { bcryptUtils } from "@/utils/bcrypt.util";
import { jwtUtils } from "@/utils/jwt.util";
import { ApiError } from "@/utils/handlers/apiError.handler";
import { AUTH_MESSAGES } from "@/constants/auth.constant";
import { LoginDto, AuthResponse, AuthUser } from "@/types/auth.types";
import httpStatus from "http-status";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    const user = await this.authRepository.findUserByUsername(data.username);

    if (!user) {
      throw new ApiError({
        status: httpStatus.UNAUTHORIZED,
        message: AUTH_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const isPasswordValid = await bcryptUtils.compare(
      data.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new ApiError({
        status: httpStatus.UNAUTHORIZED,
        message: AUTH_MESSAGES.INVALID_CREDENTIALS,
      });
    }

    const authUser: AuthUser = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    const token = jwtUtils.sign({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    return { user: authUser, token };
  }

  async verifyToken(token: string): Promise<AuthUser> {
    const payload = jwtUtils.verify(token);
    const user = await this.authRepository.findUserById(payload.userId);

    if (!user) {
      throw new ApiError({
        status: httpStatus.UNAUTHORIZED,
        message: AUTH_MESSAGES.USER_NOT_FOUND,
      });
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }
}

export const authService = new AuthService();
