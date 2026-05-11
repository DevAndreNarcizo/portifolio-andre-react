import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects, architectureProjects, landingPages } from '../data';
import type { Project } from '../types';
import './Projects.css';

type ProjectFilter = 'featured' | 'enterprise' | 'saas' | 'web' | 'legacy';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('featured');

  const featuredProjects: Project[] = [
    ...projects.filter(p => p.tier === 'saas'),
    ...architectureProjects,
  ];

  const filters: { key: ProjectFilter; label: string }[] = [
    { key: 'featured', label: 'Featured' },
    { key: 'enterprise', label: 'Architecture & APIs' },
    { key: 'saas', label: 'SaaS & Products' },
    { key: 'web', label: 'Web Apps' },
    { key: 'legacy', label: 'Client Sites' },
  ];

  const getProjects = (): Project[] => {
    switch (activeFilter) {
      case 'featured':
        return featuredProjects;
      case 'enterprise':
        return architectureProjects;
      case 'saas':
        return projects.filter(p => p.tier === 'saas');
      case 'web':
        return projects.filter(p => p.tier === 'web');
      case 'legacy':
        return landingPages;
      default:
        return featuredProjects;
    }
  };

  const displayedProjects = getProjects();

  return (
    <section id="projetos" className="section">
      <div className="container-wide">
        <h2 className="section-title">Engineering Portfolio</h2>
        <p className="section-subtitle">
          Production code, architecture decisions, and systems that solve real problems.
        </p>

        <div className="projects-filters">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              className={`filter-btn ${activeFilter === key ? 'active' : ''}`}
              onClick={() => setActiveFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {displayedProjects.length > 0 ? (
          <div className="projects-grid">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        ) : (
          <div className="projects-empty">
            <p>Projects under development. Check GitHub for progress.</p>
          </div>
        )}

        {activeFilter === 'legacy' && (
          <div className="projects-cta-wrapper">
            <p className="projects-context">
              Freelance client work — landing pages and institutional websites delivered with React, Next.js, and Tailwind CSS.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
