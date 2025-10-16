import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Plant from "@/app/models/Plant";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get data from the client
    const {
      scientificName,
      healthStatus,
      careRecommendation,
      description,
      image,
    } = await req.json();

    await connectDB();

    const newPlant = new Plant({
      userId: session.user.email || session.user.id,
      scientificName,
      healthStatus,
      careRecommendation,
      description,
      image,
    });

    await newPlant.save();

    return NextResponse.json(
      { message: "Plant saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving plant:", error);
    return NextResponse.json(
      { error: "Failed to save plant" },
      { status: 500 }
    );
  }
}
