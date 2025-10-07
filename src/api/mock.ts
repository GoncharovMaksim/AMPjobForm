export type LoginRequest = { email: string; password: string };
export type LoginResponse = { requires2fa: boolean };
export type OtpRequest = { code: string };
export type OtpResponse = { ok: true };

export class ApiError extends Error {
  code: string;
  status: number;
  constructor(code: string, message: string, status = 400) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function login(req: LoginRequest): Promise<LoginResponse> {
  await delay(600);
  const { email, password } = req;

  if (!email || !password) {
    throw new ApiError(
      "VALIDATION_ERROR",
      "Email and password are required",
      422
    );
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    throw new ApiError("INVALID_EMAIL", "Invalid email format", 422);
  }
  if (password.length < 6) {
    throw new ApiError("WEAK_PASSWORD", "Password is too short", 422);
  }

  // Имитация серверных ошибок
  if (email.includes("rate")) {
    throw new ApiError("RATE_LIMIT", "Too many attempts. Try later", 429);
  }
  if (email.includes("server")) {
    throw new ApiError("SERVER_ERROR", "Unexpected server error", 500);
  }
  if (email.includes("network")) {
    // Имитируем сетевую ошибку
    throw new ApiError("NETWORK_ERROR", "Network error", 0);
  }
  if (email.includes("invalid")) {
    throw new ApiError("INVALID_CREDENTIALS", "Invalid email or password", 401);
  }

  return { requires2fa: true };
}

export async function verifyOtp(req: OtpRequest): Promise<OtpResponse> {
  await delay(600);
  const { code } = req;
  if (!code || code.length !== 6 || /\D/.test(code)) {
    throw new ApiError("INVALID_CODE", "Code must be 6 digits", 422);
  }
  if (code === "000000") {
    throw new ApiError("CODE_EXPIRED", "Code expired", 410);
  }
  if (code === "111111") {
    throw new ApiError("RATE_LIMIT", "Too many attempts. Try later", 429);
  }
  if (code === "222222") {
    throw new ApiError("SERVER_ERROR", "Unexpected server error", 500);
  }
  if (code === "333333") {
    throw new ApiError("NETWORK_ERROR", "Network error", 0);
  }

  if (code !== "131313") {
    throw new ApiError("INVALID_CODE", "Invalid code", 401);
  }

  return { ok: true };
}
