import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const response = await fetch("https://api.plant.id/v3/identification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Api-Key": process.env.API_KEY,
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
          "Api-Key": process.env.API_KEY,
        },
        body: JSON.stringify({
          ...body,
          similar_images: true,
        }),
      }
    );

    const data = await response.json();
    const response_3 = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        data.result.classification.suggestions[0].name
      )}`,
      {
        method: "GET",
      }
    );
    const summary = await response_3.json();
    const data_2 = await response_2.json();
    return NextResponse.json({
      identification: data,
      health: data_2,
      desc: summary.extract,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Plant ID API failed", details: err.message },
      { status: 500 }
    );
  }
}
