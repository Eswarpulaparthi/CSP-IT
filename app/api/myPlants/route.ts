import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/app/lib/mongodb";
import Plant from "@/app/models/Plant";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Check that user email exists
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const plants = await Plant.find({ userId: userEmail }).sort({
    createdAt: -1,
  });

  return NextResponse.json({ plants });
}
