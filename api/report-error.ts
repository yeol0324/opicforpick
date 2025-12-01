import type { VercelRequest, VercelResponse } from "@vercel/node";

const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { message, stack, url, userAgent, source, severity, meta } =
    req.body ?? {};

  if (!message || !source || !severity) {
    return res.status(400).json({ error: "invalid payload" });
  }

  const title = `[${severity.toUpperCase()}][${source}] ${String(message).slice(
    0,
    80
  )}`;

  const bodyLines = [
    `**Severity**: ${severity}`,
    `**Source**: ${source}`,
    `**URL**: ${url ?? "N/A"}`,
    `**UserAgent**: ${userAgent ?? "N/A"}`,
    "",
  ];

  if (meta) {
    bodyLines.push("**Meta**:");
    bodyLines.push("```json");
    bodyLines.push(JSON.stringify(meta, null, 2));
    bodyLines.push("```");
    bodyLines.push("");
  }

  bodyLines.push("**Stack**:");
  bodyLines.push("```");
  bodyLines.push(stack ?? "no stack trace");
  bodyLines.push("```");
  bodyLines.push("");
  bodyLines.push("_auto-generated from frontend error reporter_");

  const ghRes = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "User-Agent": "error-reporter",
      },
      body: JSON.stringify({
        title,
        body: bodyLines.join("\n"),
        labels: [
          "auto-report",
          "bug",
          `source:${source}`,
          `severity:${severity}`,
        ],
      }),
    }
  );

  if (!ghRes.ok) {
    const text = await ghRes.text();
    console.error("GitHub issue create failed:", text);
    return res.status(500).json({ error: "failed to create github issue" });
  }

  const data = await ghRes.json();
  return res.status(200).json({ issueUrl: data.html_url });
}
