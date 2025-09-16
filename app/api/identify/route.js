import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await fetch("https://api.plant.id/v3/identification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": "aTNtjJfkXuUOdKEWFQOx2UauLCyFpadomrB0Nko7fABNazOcvL",
      },
      body: JSON.stringify({
        ...body,
        similar_images: true,
      }),
    });

    const response_2 = await fetch(
      "https://plant.id/api/v3/health_assessment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": "aTNtjJfkXuUOdKEWFQOx2UauLCyFpadomrB0Nko7fABNazOcvL",
        },
        body: JSON.stringify({
          ...body,
          similar_images: true,
        }),
      }
    );

    const data = await response.json();
    const data_2 = await response_2.json();
    return NextResponse.json({
      identification: data,
      health: data_2,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Plant ID API failed", details: err.message },
      { status: 500 }
    );
  }
}
