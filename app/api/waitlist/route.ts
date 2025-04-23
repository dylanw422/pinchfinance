import { addUser, getUserCount } from "@/db/queries";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    const result = await addUser(email);
    if (result) {
      return Response.json({ message: "success" });
    }
  } catch (error: any) {
    if (error.code === "23505") {
      return Response.json({ message: "Already on the waitlist" }, { status: 409 });
    }

    return Response.json({ message: "error" });
  }
}

export async function GET(req: Request) {
  try {
    const count = await getUserCount();
    return Response.json({ count });
  } catch (error) {
    return Response.json({ message: "error" });
  }
}
