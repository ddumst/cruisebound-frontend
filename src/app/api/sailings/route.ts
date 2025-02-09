import { NextResponse } from "next/server";
import axios from "axios";
import { Sailing } from "@/domain/sailing.interface";

interface SailingResponse {
  results: Sailing[]
}

export async function GET() {
  try {
    const response = await axios.get<SailingResponse>("https://sandbox.cruisebound-qa.com/sailings");

    return NextResponse.json({
      items: response.data.results,
      total: response.data.results.length,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message },
        { status: error.response?.status || 500 }
      );
    }

    // Manejo genérico en caso de que no sea un error de Axios
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
