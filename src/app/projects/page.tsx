'use client';
import Navigation from '@components/Navigation';
import ProjectCard from '@components/ProjectCard';
import Footer from '@components/Footer';
import {
  fetchUserRepositories,
  fetchRepositoryLanguages,
  GitHubRepoResponse,
} from '@lib/GithubApi';
import { useEffect, useState } from 'react';
import {
  FaCheckCircle,
  FaFilter,
  FaRegCircle,
  FaSearch,
  FaTag,
} from 'react-icons/fa';

const ProjectsPage = () => {
  const [repos, setRepos] = useState<GitHubRepoResponse[]>([]);
  const [repoLanguages, setRepoLanguages] = useState<Record<string, string[]>>(
    {},
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [isReposLoading, setIsReposLoading] = useState(true);
  const [isLanguagesLoading, setIsLanguagesLoading] = useState(false);

  useEffect(() => {
    const fetchRepos = async () => {
      setIsReposLoading(true);
      try {
        const response = await fetchUserRepositories('bloectasy', [
          'valeriyya',
          'portfolio',
        ]);
        setRepos(response);
      } finally {
        setIsReposLoading(false);
      }
    };

    fetchRepos();
  }, []);

  useEffect(() => {
    if (repos.length === 0) {
      return;
    }

    const fetchLanguagesForRepos = async () => {
      setIsLanguagesLoading(true);
      try {
        const entries = await Promise.all(
          repos.map(async (repo) => {
            const langs = await fetchRepositoryLanguages('bloectasy', repo.name);
            return [repo.name, langs] as const;
          }),
        );

        setRepoLanguages(Object.fromEntries(entries));
      } finally {
        setIsLanguagesLoading(false);
      }
    };

    fetchLanguagesForRepos();
  }, [repos]);

  const isLoading = isReposLoading || isLanguagesLoading;

  const allLanguages = Array.from(
    new Set(Object.values(repoLanguages).flat()),
  ).sort();

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(language)
        ? prev.filter((lang) => lang !== language)
        : [...prev, language],
    );
  };

  const isRepoVisible = (repo: GitHubRepoResponse) => {
    const matchesSearch = repo.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLanguage =
      selectedLanguages.length === 0
        ? true
        : (repoLanguages[repo.name] || []).some((lang) =>
            selectedLanguages.includes(lang),
          );

    return matchesSearch && matchesLanguage;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        {/* Search Bar Section*/}
        <h1 className="my-12 text-center text-4xl font-semibold">Projects</h1>
        <div className="flex h-11 w-full items-center justify-between gap-4">
          <div className="relative max-w-md flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shadow-center text-text focus:ring-primary placeholder-primary focus:border-primary w-full rounded-2xl px-4 py-2 pr-12 transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="Search"
              disabled={isLoading}
            />
            <FaSearch className="text-primary pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="text-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Filter projects"
              disabled={isLoading}
            >
              <FaFilter />
            </button>
            {isFilterOpen && (
              <div className="shadow-center bg-background/80 border-primary/30 ring-primary/10 absolute right-0 mt-2 w-64 rounded-xl border p-4 ring-1 backdrop-blur-md">
                <div>
                  <p className="text-text mb-2 flex items-center gap-2 text-sm font-semibold">
                    <FaTag className="text-primary" />
                    Languages
                  </p>
                  <div className="subtle-scrollbar max-h-40 space-y-2 overflow-y-auto pr-1">
                    {allLanguages.length === 0 ? (
                      <p className="text-text/60 text-sm">
                        No languages found.
                      </p>
                    ) : (
                      allLanguages.map((language) => {
                        const isSelected = selectedLanguages.includes(language);
                        return (
                          <button
                            key={language}
                            type="button"
                            onClick={() => toggleLanguage(language)}
                            className="text-text hover:bg-primary/10 flex w-full items-center gap-2 rounded-lg px-2 py-1 text-sm transition-colors"
                          >
                            {isSelected ? (
                              <FaCheckCircle className="text-primary" />
                            ) : (
                              <FaRegCircle className="text-text/50" />
                            )}
                            <span>{language}</span>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    className="text-text/70 hover:text-text text-sm"
                    onClick={() => {
                      setSelectedLanguages([]);
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filtered Repos / Loading Skeletons */}
        <div className="my-8 flex flex-col">
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div key={`skeleton-${idx}`} className="mb-8">
                  <ProjectCard isLoading className="shadow-none" />
                </div>
              ))
            : repos.map((repo) => {
                const visible = isRepoVisible(repo);
                return (
                  <div
                    key={repo.id}
                    className={`shadow-center overflow-hidden rounded-2xl transition-all duration-300 ease-in-out ${
                      visible
                        ? 'mb-8 max-h-125 opacity-100'
                        : 'mb-0 max-h-0 opacity-0'
                    }`}
                  >
                    <div
                      className={
                        visible ? 'pointer-events-auto' : 'pointer-events-none'
                      }
                    >
                      <ProjectCard
                        title={repo.name}
                        description={repo.description ?? ''}
                        technologies={repoLanguages[repo.name] || []}
                        className="shadow-none"
                      />
                    </div>
                  </div>
                );
              })}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectsPage;