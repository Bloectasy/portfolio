import ProjectCard from '@components/ProjectCard';
import { FaDocker, FaRust, FaReact } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';

const ProjectsShowcase = () => {
  return (
    <div className="grid gap-8 sm:gap-12 md:grid-cols-2">
      <ProjectCard
        title="Valeriyya"
        description=""
        technologiesIcons={[FaRust, FaDocker]}
      />
      <ProjectCard
        title="Portfolio"
        description=""
        technologiesIcons={[SiTypescript, FaReact, FaDocker, SiNextdotjs]}
      />
    </div>
  );
};

export default ProjectsShowcase;
