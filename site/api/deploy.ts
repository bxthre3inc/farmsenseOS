import type { Context } from "hono";
import { execSync } from "child_process";

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;
const WORKSPACE_DIR = "/home/workspace";

// Verify GitHub webhook signature
async function verifySignature(c: Context): Promise<boolean> {
  const signature = c.req.header("x-hub-signature-256");
  if (!signature || !WEBHOOK_SECRET) return false;

  const body = await c.req.text();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const hmac = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
  const expected = "sha256=" + Array.from(new Uint8Array(hmac))
    .map(b => b.toString(16).padStart(2, "0")).join("");

  return signature === expected;
}

export default async (c: Context) => {
  // Only respond to push events
  const event = c.req.header("x-github-event");
  if (event !== "push") {
    return c.json({ message: "Ignored: not a push event" }, 200);
  }

  // Verify signature
  if (!(await verifySignature(c))) {
    return c.json({ error: "Invalid signature" }, 401);
  }

  try {
    // Pull latest changes
    const pullOutput = execSync(`cd ${WORKSPACE_DIR} && git pull origin main 2>&1`, {
      encoding: "utf-8",
      timeout: 60000
    });

    // Check for changes
    const hasChanges = !pullOutput.includes("Already up to date");

    return c.json({
      success: true,
      deployed: hasChanges,
      message: hasChanges ? "Changes deployed" : "Already up to date",
      output: pullOutput.trim()
    });
  } catch (error) {
    console.error("Deploy error:", error);
    return c.json({
      success: false,
      error: error instanceof Error ? error.message : "Deploy failed"
    }, 500);
  }
}
