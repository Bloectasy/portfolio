import { NextResponse } from 'next/server';

const GITHUB_API = 'https://api.github.com';

const withAuthHeaders = (extra?: Record<string, string>): Record<string, string> => {
  const headers: Record<string, string> = { ...(extra ?? {}) };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `token ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
};

const githubFetch = (url: string, headers?: Record<string, string>) =>
  fetch(url, { headers, next: { revalidate: 3600 } });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');
  const username = searchParams.get('username') ?? owner ?? '';
  const include = searchParams.get('include');

  if (!type) {
    return NextResponse.json({ error: 'Missing type parameter' }, { status: 400 });
  }

  try {
    if (type === 'repo') {
      if (!owner || !repo) {
        return NextResponse.json(
          { error: 'Missing owner or repo parameter' },
          { status: 400 },
        );
      }

      const res = await githubFetch(
        `${GITHUB_API}/repos/${owner}/${repo}`,
        withAuthHeaders(),
      );
      const data = await res.json();

      if (!res.ok) return NextResponse.json({ error: data }, { status: res.status });
      return NextResponse.json(data);
    }

    if (type === 'repos') {
      if (!username) {
        return NextResponse.json(
          { error: 'Missing username parameter' },
          { status: 400 },
        );
      }

      if (include) {
        const allowlist = include
          .split(',')
          .map((name) => name.trim())
          .filter(Boolean);

        if (allowlist.length === 0) return NextResponse.json([]);

        const repos = await Promise.all(
          allowlist.map(async (repoName) => {
            const res = await githubFetch(
              `${GITHUB_API}/repos/${username}/${repoName}`,
              withAuthHeaders(),
            );
            if (!res.ok) {
              throw new Error(`Failed to fetch repo ${repoName}: ${res.status}`);
            }
            return res.json();
          }),
        );

        return NextResponse.json(repos);
      }

      const results: unknown[] = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const res = await githubFetch(
          `${GITHUB_API}/users/${username}/repos?page=${page}&per_page=100&sort=updated`,
          withAuthHeaders(),
        );

        if (!res.ok) break;

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          hasMore = false;
        } else {
          results.push(...data);
          page++;
        }
      }

      return NextResponse.json(results);
    }

    if (type === 'readme') {
      if (!owner || !repo) {
        return NextResponse.json(
          { error: 'Missing owner or repo parameter' },
          { status: 400 },
        );
      }

      const res = await githubFetch(
        `${GITHUB_API}/repos/${owner}/${repo}/readme`,
        withAuthHeaders({ Accept: 'application/vnd.github.v3.raw' }),
      );

      if (!res.ok) return NextResponse.json({ readme: null }, { status: res.status });

      const text = await res.text();
      return NextResponse.json({ readme: text });
    }

    if (type === 'languages') {
      if (!owner || !repo) {
        return NextResponse.json(
          { error: 'Missing owner or repo parameter' },
          { status: 400 },
        );
      }

      const res = await githubFetch(
        `${GITHUB_API}/repos/${owner}/${repo}/languages`,
        withAuthHeaders(),
      );

      if (!res.ok) return NextResponse.json({ languages: [] }, { status: res.status });

      const data = (await res.json()) as Record<string, number>;
      return NextResponse.json({ languages: Object.keys(data) });
    }

    return NextResponse.json({ error: `Unknown type: ${type}` }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}