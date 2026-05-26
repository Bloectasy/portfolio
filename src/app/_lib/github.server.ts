import type { GitHubRepoResponse } from '@lib/github.types';

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

export const fetchGitHubRepository = async (
  owner: string,
  repo: string,
): Promise<GitHubRepoResponse> => {
  const res = await githubFetch(
    `${GITHUB_API}/repos/${owner}/${repo}`,
    withAuthHeaders(),
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch repository ${owner}/${repo}: ${res.status}`);
  }

  return res.json() as Promise<GitHubRepoResponse>;
};

export const fetchUserRepositories = async (
  username: string,
  include?: string[],
): Promise<GitHubRepoResponse[]> => {
  if (include && include.length > 0) {
    const repos = await Promise.all(
      include.map(async (repoName) => {
        const res = await githubFetch(
          `${GITHUB_API}/repos/${username}/${repoName}`,
          withAuthHeaders(),
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch repo ${repoName}: ${res.status}`);
        }
        return res.json() as Promise<GitHubRepoResponse>;
      }),
    );
    return repos;
  }

  const results: GitHubRepoResponse[] = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await githubFetch(
      `${GITHUB_API}/users/${username}/repos?page=${page}&per_page=100&sort=updated`,
      withAuthHeaders(),
    );

    if (!res.ok) break;

    const data = (await res.json()) as GitHubRepoResponse[];

    if (!Array.isArray(data) || data.length === 0) {
      hasMore = false;
    } else {
      results.push(...data);
      page++;
    }
  }

  return results;
};

export const fetchRepositoryReadme = async (
  owner: string,
  repo: string,
): Promise<string | null> => {
  try {
    const res = await githubFetch(
      `${GITHUB_API}/repos/${owner}/${repo}/readme`,
      withAuthHeaders({ Accept: 'application/vnd.github.v3.raw' }),
    );

    if (!res.ok) return null;

    return res.text();
  } catch (error) {
    console.error(`Failed to fetch README for ${owner}/${repo}:`, error);
    return null;
  }
};

export const fetchRepositoryLanguages = async (
  owner: string,
  repo: string,
): Promise<string[]> => {
  try {
    const res = await githubFetch(
      `${GITHUB_API}/repos/${owner}/${repo}/languages`,
      withAuthHeaders(),
    );

    if (!res.ok) return [];

    const data = (await res.json()) as Record<string, number>;
    return Object.keys(data);
  } catch (error) {
    console.error(`Failed to fetch languages for ${owner}/${repo}:`, error);
    return [];
  }
};