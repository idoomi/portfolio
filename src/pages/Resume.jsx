import './Page.css'
import './Resume.css'

function Resume() {
  return (
    <section className="page">
      <div className="resume-header">
        <h1>Resume</h1>
        <a className="btn btn-primary" href="/cv.pdf" download>
          Download CV (PDF)
        </a>
      </div>

      <p className="resume-placeholder-note">
        This page is a placeholder. Send over your CV content (or a PDF/Word
        file) and it'll be filled in here — experience, education, skills,
        and a downloadable file at <code>public/cv.pdf</code>.
      </p>

      <div className="resume-section">
        <h2>Experience</h2>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>Job Title — Company Name</h3>
            <span className="resume-dates">Month Year – Present</span>
          </div>
          <ul>
            <li>Placeholder responsibility or achievement.</li>
            <li>Placeholder responsibility or achievement.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>Degree — Institution Name</h3>
            <span className="resume-dates">Year – Year</span>
          </div>
        </div>
      </div>

      <div className="resume-section">
        <h2>Skills</h2>
        <p>JavaScript, React, Node.js, Git, and more — replace with your own.</p>
      </div>
    </section>
  )
}

export default Resume
