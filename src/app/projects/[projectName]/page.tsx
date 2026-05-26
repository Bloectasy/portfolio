import { fetchGitHubRepository, fetchRepositoryReadme } from '@lib/github.server';
import Navigation from '@components/Navigation';
import Footer from '@components/Footer';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ projectName: string }>;
}) => {
  const { projectName } = await params;
  const repo = await fetchGitHubRepository('bloectasy', projectName);
  const repoReadme = await fetchRepositoryReadme('bloectasy', projectName);

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 px-8 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-primary mb-4 text-4xl font-bold">{repo.name}</h1>
          <p className="text-text/80 mb-8 text-2xl">{repo.description}</p>

          {repoReadme && (
            <div className="markdown-content">

              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  // eslint-disable-next-line
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-primary mt-8 mb-4 text-3xl font-bold"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-primary mt-6 mb-3 text-2xl font-semibold"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  h3: ({ node, ...props }) => (
                    <h3
                      className="text-primary mt-4 mb-2 text-xl font-semibold"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  p: ({ node, ...props }) => (
                    <p className="text-text mb-4 leading-relaxed" {...props} />
                  ),
                  // eslint-disable-next-line
                  a: ({ node, ...props }) => (
                    <a
                      className="text-primary hover:text-primary/80 underline transition-colors"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  ul: ({ node, ...props }) => (
                    <ul
                      className="text-text mb-4 ml-6 list-disc space-y-2"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  ol: ({ node, ...props }) => (
                    <ol
                      className="text-text mb-4 ml-6 list-decimal space-y-2"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  li: ({ node, ...props }) => (
                    <li className="text-text leading-relaxed" {...props} />
                  ),
                  // eslint-disable-next-line
                  code: ({ node, inline, ...props }: any) =>
                    inline ? (
                      <code
                        className="text-primary rounded px-1.5 py-0.5 font-mono text-sm bg-background!"
                        {...props}
                      />
                    ) : (
                      <code className="font-mono text-sm" {...props} />
                    ),
                  // eslint-disable-next-line
                  pre: ({ node, ...props }) => (
                    <pre
                      className="shadow-center mb-4 overflow-x-auto rounded-lg bg-background/95 p-4"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-primary text-text/80 mb-4 border-l-4 pl-4 italic"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  table: ({ node, ...props }) => (
                    <div className="mb-4 overflow-x-auto">
                      <table
                        className="text-text min-w-full border-collapse"
                        {...props}
                      />
                    </div>
                  ),
                  // eslint-disable-next-line
                  th: ({ node, ...props }) => (
                    <th
                      className="bg-primary/10 border-primary/20 border px-4 py-2 text-left font-semibold"
                      {...props}
                    />
                  ),
                  // eslint-disable-next-line
                  td: ({ node, ...props }) => (
                    <td
                      className="border-primary/20 border px-4 py-2"
                      {...props}
                    />
                  ),
                }}
              >
                {repoReadme}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectPage;
