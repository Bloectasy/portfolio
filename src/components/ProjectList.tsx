import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Fuse from 'fuse.js';

interface Project {
  title: string;
  description: string;
  category: string[];
  url: string;
}

interface ProjectListProps {
  projects: Project[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const [sortBy] = useState<string>('title');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fuse = useMemo(() => {
    const options = {
      includeScore: true,
      threshold: 0.3,
      keys: ['title', 'description', 'category'],
    };
    return new Fuse(projects, options);
  }, [projects]);

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const filteredProjects = useMemo(() => {
    if (searchTerm.trim() === '') {
      return sortedProjects;
    }
    const searchResults = fuse.search(searchTerm);
    return searchResults.map((result) => result.item);
  }, [searchTerm, sortedProjects, fuse]);

  return (
    <>
      <input
        type="text"
        placeholder="Search projects"
        value={searchTerm}
        onChange={(e) => { setSearchTerm(e.target.value); }}
        className="container-input"
      />
      <div className="container-blank"></div>
      {filteredProjects.map((project, index) => (
        <Link id="projects" className="container-text-box-outline container-text" key={index} to={project.url}>
          <div className="container-text">{project.title}</div>
          <div className="container-sub-text">{project.description}</div>
        </Link>
      ))}
    </>
  );
}
