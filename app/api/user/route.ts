import { getPlaidItems, getUserData, insertPlaidBalance } from "@/db/queries";
import { auth } from "@/lib/auth";
import { plaidUrl } from "@/lib/plaid";
import axios from "axios";
import { headers } from "next/headers";

export async function GET(req: Request) {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  if (!session?.user.id) {
    return Response.json({
      message: "You must be signed in to access this endpoint.",
    });
  }

  try {
    const userData = await getUserData(session?.user.id);
    return Response.json(userData);
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Failed to get user data." });
  }
}
