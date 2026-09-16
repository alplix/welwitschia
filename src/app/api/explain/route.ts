import { NextResponse } from "next/server";
import { ExplainPeriodRequestSchema, explainPeriod } from "@/lib/explain-period";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = ExplainPeriodRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid period data." }, { status: 400 });
  }

  try {
    const explanation = await explainPeriod(parsed.data);
    return NextResponse.json({ explanation });
  } catch {
    return NextResponse.json(
      { error: "The AI explanation is unavailable right now. The rest of the analysis is unaffected." },
      { status: 503 },
    );
  }
}
