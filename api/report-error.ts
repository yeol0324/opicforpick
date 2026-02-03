import type { VercelRequest, VercelResponse } from '@vercel/node';

const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;

type ErrorReportPayload = {
  message: unknown;
  stack?: string;
  url?: string;
  userAgent?: string;
  source: string;
  severity: string;
  meta?: unknown;
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { message, stack, url, userAgent, source, severity, meta } =
    (req.body ?? {}) as ErrorReportPayload;

  if (!message || !source || !severity) {
    return res.status(400).json({ error: 'invalid payload' });
  }

  const title = `[${severity.toUpperCase()}][${source}] ${String(message).slice(
    0,
    80,
  )}`;

  const bodyLineList: string[] = [
    `**Severity**: ${severity}`,
    `**Source**: ${source}`,
    `**URL**: ${url ?? 'N/A'}`,
    `**UserAgent**: ${userAgent ?? 'N/A'}`,
    '',
  ];

  if (meta != null) {
    bodyLineList.push('**Meta**:');
    bodyLineList.push('```json');
    bodyLineList.push(JSON.stringify(meta, null, 2));
    bodyLineList.push('```');
    bodyLineList.push('');
  }

  bodyLineList.push('**Stack**:');
  bodyLineList.push('```');
  bodyLineList.push(stack ?? 'no stack trace');
  bodyLineList.push('```');
  bodyLineList.push('');
  bodyLineList.push('_auto-generated from frontend error reporter_');

  try {
    const ghRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
          'User-Agent': 'error-reporter',
        },
        body: JSON.stringify({
          title,
          body: bodyLineList.join('\n'),
          labels: [
            'auto-report',
            'bug',
            `source:${source}`,
            `severity:${severity}`,
          ],
        }),
      },
    );

    if (!ghRes.ok) {
      const text = await ghRes.text().catch(() => '');
      console.error('GitHub issue create failed:', ghRes.status, text);

      return res.status(502).json({
        error: 'failed to create github issue',
        status: ghRes.status,
        details: text || undefined,
      });
    }

    const data = (await ghRes.json()) as { html_url?: string };
    return res.status(200).json({ issueUrl: data.html_url });
  } catch (error) {
    console.error('GitHub issue create error:', error);
    return res.status(500).json({ error: 'unexpected error while reporting' });
  }
}
