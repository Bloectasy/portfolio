import Link from 'next/link';
import { createElement } from 'react';
import { IconType } from 'react-icons';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface ProjectCardProp {
  title?: string;
  description?: string;
  technologiesIcons?: IconType[];
  technologies?: string[];
  className?: string;
  isLoading?: boolean;
}

const ProjectCard = ({
  title,
  description,
  technologiesIcons,
  technologies,
  className,
  isLoading = false,
}: ProjectCardProp) => {
  if (isLoading) {
    return (
      <div
        className={`shadow-center flex w-full animate-pulse flex-col justify-center gap-6 rounded-2xl p-6 sm:p-8 ${className ?? ''}`}
      >
        <div className="flex items-center justify-between">
          <div className="bg-primary/20 h-9 w-40 rounded-md" />
          <div className="bg-primary/20 h-6 w-6 rounded" />
        </div>

        <div className="space-y-2">
          <div className="bg-text/20 h-6 w-full rounded-md" />
          <div className="bg-text/20 h-6 w-5/6 rounded-md" />
        </div>

        <div className="flex gap-4">
          <div className="bg-primary/20 h-9 w-9 rounded-full" />
          <div className="bg-primary/20 h-9 w-9 rounded-full" />
          <div className="bg-primary/20 h-9 w-9 rounded-full" />
        </div>

        <div className="flex gap-6">
          <div className="shadow-project-center bg-primary/20 h-8 w-20 rounded-2xl" />
          <div className="shadow-project-center bg-primary/20 h-8 w-24 rounded-2xl" />
          <div className="shadow-project-center bg-primary/20 h-8 w-16 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`shadow-center flex w-full flex-col justify-center gap-6 rounded-2xl p-6 sm:p-8 ${className ?? ''}`}
    >
      <div className="text-primary flex items-center justify-between font-semibold">
        <h1 className="text-2xl sm:text-3xl">{title}</h1>
        <Link href={`/projects/${title}`}>
          <FaExternalLinkAlt className="text-xl" />
        </Link>
      </div>

      <h2 className="text-text/80 text-lg sm:text-xl">{description}</h2>

      {technologiesIcons && (
        <p className="text-primary flex gap-3 sm:gap-4">
          {technologiesIcons.map((technologyIcon) => (
            <span key={technologyIcon.name}>
              {createElement(technologyIcon, { size: 36 })}
            </span>
          ))}
        </p>
      )}

      {technologies && (
        <div className="text-primary flex gap-4 sm:gap-6">
          {technologies.map((technology) => (
            <span
              className="shadow-project-center rounded-2xl px-3.5 py-1"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;