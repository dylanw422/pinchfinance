import { addPlaidAccount, addPlaidItem } from "@/db/queries";
import { plaidUrl } from "@/lib/plaid";
import axios from "axios";

export async function POST(req: Request) {
  const { user_id, public_token, metadata } = await req.json();

  try {
    const res = await axios.post(`${plaidUrl}/item/public_token/exchange`, {
      client_id: process.env.PLAID_CLIENT_ID,
      secret: process.env.PLAID_SANDBOX_KEY,
      public_token,
    });

    const { access_token, item_id } = res.data;

    const plaidItem = await addPlaidItem(
      user_id,
      access_token,
      metadata.institution.institution_id,
      metadata.institution.name,
      item_id,
      new Date(),
      new Date()
    );

    metadata.accounts.forEach(async (account: any) => {
      await addPlaidAccount(
        plaidItem[0].id,
        account.id,
        account.name,
        account.mask,
        account.type,
        account.subtype,
        account.official_name,
        new Date(),
        new Date()
      );
    });

    return Response.json({ message: "Public token successfully exchanged." });
  } catch (err) {
    console.log(err);
    return Response.json({ message: "Failed to exchange token." });
  }
}
