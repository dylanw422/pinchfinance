import { plaidUrl } from "@/lib/plaid";
import axios from "axios";

export async function POST(req: Request) {
  const { user_id } = await req.json();

  try {
    const res = await axios.post(`${plaidUrl}/link/token/create`, {
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SANDBOX_KEY,
      client_name: "Pinch",
      language: "en",
      country_codes: ["US"],
      user: {
        client_user_id: user_id,
      },
      products: ["transactions", "auth", "liabilities", "investments"],
      // access_token: accessToken, // Used to launch Link in update mode
      // redirect_uri: `${
      //   process.env.NODE_ENV === "development"
      //     ? "https://adb4-67-146-252-11.ngrok-free.app/dashboard"
      //     : "https://pinch-topaz.vercel.app/dashboard"
      // }`,
    });

    return Response.json(res.data.link_token);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Server error." });
  }
}
