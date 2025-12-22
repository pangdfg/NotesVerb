import type { JWTPayload, ServiceResponse } from "../../../shared/types/index.js";
import { createServiceError } from "../../../shared/utils/index.js";
import axios from "axios";

export class AuthClient {
  private readonly authServiceUrl: string;

  constructor() {
    this.authServiceUrl =
      process.env.AUTH_SERVICE_URL || "http://localhost:3001";
  }

  async validateToken(token: string): Promise<JWTPayload> {
    try {
      const response = await axios.post<ServiceResponse<JWTPayload>>(
        `${this.authServiceUrl}/auth/validate`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        }
      );

      if (!response.data.success || !response.data.data) {
        throw createServiceError(
          "Invalid token response from auth service",
          401
        );
      }

      return response.data.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNREFUSED") {
            throw createServiceError("Auth service is unavailable", 503);
        }

        if (error.response?.status === 401) {
            throw createServiceError("Invalid or expired token", 401);
        }

        throw createServiceError("Auth service error", 502);
    }

  throw createServiceError("An unexpected error occurred", 500);
}
  }
}