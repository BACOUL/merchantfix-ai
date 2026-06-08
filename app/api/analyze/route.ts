import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "CSV analysis API placeholder. CSV upload and diagnostic processing are intentionally not implemented in this project-structure step."
    },
    { status: 501 }
  );
}
