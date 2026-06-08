import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message:
        "Surface scan API placeholder. Public product fetching is intentionally not implemented in this project-structure step."
    },
    { status: 501 }
  );
}
