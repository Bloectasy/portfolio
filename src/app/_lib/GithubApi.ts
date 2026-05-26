import type { GitHubRepoResponse } from '@lib/github.types';

export type { GitHubRepoResponse };

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '';
  const vercelUrl = process.env.VERCEL_URL;
  if (vercelUrl) return `https://${vercelUrl}`;
  return 'http://localhost:3000';
};

const buildApiUrl = (path: string) => `${getBaseUrl()}${path}`;

const fetchGitHubRepository = async (
  owner: string,
  repo: string,
): Promise<GitHubRepoResponse> => {
  const url = buildApiUrl(
    `/api/github?type=repo&owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
  );
  const response = await fetch(url);
  const data = (await response.json()) as GitHubRepoResponse;

  if (!response.ok) {
    throw new Error(`Failed to fetch repository: ${response.status}`);
  }

  return data;
};

const fetchUserRepositories = async (
  username: string,
  include?: string[],
): Promise<GitHubRepoResponse[]> => {
  const params = new URLSearchParams({ type: 'repos', username });
  if (include && include.length > 0) {
    params.set('include', include.join(','));
  }

  const url = buildApiUrl(`/api/github?${params.toString()}`);
  const response = await fetch(url);
  const data = (await response.json()) as GitHubRepoResponse[];

  if (!response.ok || !Array.isArray(data)) {
    console.error('GitHub API error:', data);
    return [];
  }

  return data;
};

const fetchRepositoryReadme = async (
  owner: string,
  repo: string,
): Promise<string | null> => {
  try {
    const url = buildApiUrl(
      `/api/github?type=readme&owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
    );
    const response = await fetch(url);
    const payload = (await response.json()) as { readme: string | null };

    if (!response.ok) return null;

    return payload.readme ?? null;
  } catch (error) {
    console.error(`Failed to fetch README for ${owner}/${repo}:`, error);
    return null;
  }
};

const fetchRepositoryLanguages = async (
  owner: string,
  repo: string,
): Promise<string[]> => {
  try {
    const url = buildApiUrl(
      `/api/github?type=languages&owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
    );
    const response = await fetch(url);
    const payload = (await response.json()) as { languages: string[] };

    if (!response.ok) return [];

    return payload.languages ?? [];
  } catch (error) {
    console.error(`Failed to fetch languages for ${owner}/${repo}:`, error);
    return [];
  }
};

export default fetchGitHubRepository;
export {
  fetchUserRepositories,
  fetchRepositoryReadme,
  fetchRepositoryLanguages,
};