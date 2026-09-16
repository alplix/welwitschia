import { analyzeRepository } from "@/lib/analyze-repository";
import { toAppError } from "@/lib/errors";
import type { StreamEvent } from "@/lib/types";

export const dynamic = "force-dynamic";

interface RouteParams {
  params: Promise<{ owner: string; repo: string }>;
}

const NAME_PATTERN = /^[A-Za-z0-9._-]+$/;

export async function GET(request: Request, { params }: RouteParams) {
  const { owner, repo } = await params;
  const { searchParams } = new URL(request.url);
  const skipCache = searchParams.get("refresh") === "1";

  if (!NAME_PATTERN.test(owner) || !NAME_PATTERN.test(repo)) {
    const event: StreamEvent = { type: "error", code: "INVALID_URL", message: "Invalid repository identifier." };
    return new Response(`${JSON.stringify(event)}\n`, {
      status: 400,
      headers: { "Content-Type": "application/x-ndjson" },
    });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: StreamEvent) => {
        controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
      };

      try {
        const data = await analyzeRepository({
          owner,
          repo,
          skipCache,
          onProgress: (step, label) => send({ type: "progress", step, label }),
        });
        send({ type: "done", data });
      } catch (error) {
        const appError = toAppError(error);
        send({ type: "error", code: appError.code, message: appError.friendlyMessage });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
