declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    CLIENT_URL: string;
    MONGODB_URI: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRY: Jwt.SignOptions["expiresIn"];
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRY: Jwt.SignOptions["expiresIn"];
    RESET_TOKEN_SECRET: string;
    RESET_TOKEN_EXPIRY: Jwt.SignOptions["expiresIn"];
  }
}
