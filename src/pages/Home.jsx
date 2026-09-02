import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <section className="hero">
      <p className="hero-eyebrow">Hi, my name is</p>
      <h1 className="hero-name">Marian Nadine Amar</h1>
      <h2 className="hero-tagline">I build things for the web.</h2>
      <p className="hero-description">
        I'm a software developer focused on building clean, functional, and
        user-friendly applications. Welcome to my portfolio.
      </p>
      <div className="hero-actions">
        <Link to="/projects" className="btn btn-primary">
          View Projects
        </Link>
        <Link to="/resume" className="btn btn-secondary">
          View Resume
        </Link>
      </div>
    </section>
  )
}

export default Home
