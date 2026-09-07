import './Page.css'
import FloatingSprites from '../components/FloatingSprites.jsx'

function About() {
  return (
    <section className="page">
      <FloatingSprites />
      <h1>About Me</h1>
      <p>
        I'm a software developer with a passion for building well-crafted
        applications and solving real problems with code. This section is a
        placeholder — replace it with your own story: your background, what
        you're currently focused on, and what drives you as a developer.
      </p>
      <h2>Skills</h2>
      <ul className="skills-list">
        <li>JavaScript / TypeScript</li>
        <li>React</li>
        <li>Node.js</li>
        <li>Git &amp; GitHub</li>
      </ul>
    </section>
  )
}

export default About
