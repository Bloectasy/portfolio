import Footer from '@components/Footer';
import Navigation from '@components/Navigation';
import ProjectCard from '@components/ProjectCard';
import { FaFilter, FaSearch } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <h1 className="my-12 text-center text-3xl font-semibold sm:text-4xl">Projects</h1>
        <div className="flex w-full flex-col gap-3 sm:h-11 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="relative max-w-md flex-1">
            <input
              type="text"
              className="shadow-center text-text focus:ring-primary placeholder-primary focus:border-primary w-full rounded-2xl px-4 py-2 pr-12 transition-all duration-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="Search"
              disabled
              readOnly
              value=""
            />
            <FaSearch className="text-primary pointer-events-none absolute top-1/2 right-4 -translate-y-1/2" />
          </div>

          <div className="relative self-end sm:self-auto">
            <button
              type="button"
              className="text-primary cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Filter projects"
              disabled
            >
              <FaFilter />
            </button>
          </div>
        </div>

        <div className="my-8 flex flex-col">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={`loading-skeleton-${index}`} className="mb-8">
              <ProjectCard isLoading className="shadow-none" />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Loading;