import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const response = await axios.get("https://sandbox.cruisebound-qa.com/sailings");

    return NextResponse.json({
      items: response.data.results,
      total: response.data.results.length,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
