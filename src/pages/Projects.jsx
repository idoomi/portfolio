import './Page.css'
import './Projects.css'

const projects = [
  {
    title: 'Project One',
    description: 'A short description of this project goes here — what it does and what problem it solves.',
    tech: ['React', 'Node.js'],
    link: '#',
  },
  {
    title: 'Project Two',
    description: 'A short description of this project goes here — what it does and what problem it solves.',
    tech: ['JavaScript', 'CSS'],
    link: '#',
  },
  {
    title: 'Project Three',
    description: 'A short description of this project goes here — what it does and what problem it solves.',
    tech: ['Python'],
    link: '#',
  },
]

function Projects() {
  return (
    <section className="page">
      <h1>Projects</h1>
      <p>A selection of things I've built. Replace these with your own projects.</p>
      <div className="project-grid">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="project-card"
            target="_blank"
            rel="noreferrer"
          >
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tech.map((tag) => (
                <span key={tag} className="project-tag">
                  {tag}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Projects
