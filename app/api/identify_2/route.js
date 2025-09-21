import { NextResponse } from "next/server";

export async function POST(req) {
  const formData = await req.formData();

  const api_key = process.env.API_KEY_PN;
  const url = `https://my-api.plantnet.org/v2/identify/all?api-key=${api_key}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    const response_3 = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        data.results[0].species.scientificNameWithoutAuthor
      )}`,
      {
        method: "GET",
      }
    );
    const summary = await response_3.json();
    return NextResponse.json({ data: data, desc: summary.extract });
  } catch (error) {
    return NextResponse.json(
      { error: "PlantNet request failed", details: error.message },
      { status: 500 }
    );
  }
}
