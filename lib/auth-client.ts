import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://c257-67-146-252-11.ngrok-free.app/"
      : "https://pinch-topaz.vercel.app",
});
