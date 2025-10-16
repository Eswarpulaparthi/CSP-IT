import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Plant from "@/app/models/Plant";

export async function GET() {
  try {
    await connectDB();
    const plants = await Plant.find().sort({ createdAt: -1 });
    return NextResponse.json(plants);
  } catch (error) {
    console.error("Error fetching plants:", error);
    return NextResponse.json(
      { error: "Failed to fetch plants" },
      { status: 500 }
    );
  }
}
