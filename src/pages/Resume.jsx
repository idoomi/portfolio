import { useState } from 'react'
import CvDownloadModal from '../components/CvDownloadModal.jsx'
import FloatingSprites from '../components/FloatingSprites.jsx'
import AnimatedSprite from '../components/AnimatedSprite.jsx'
import './Page.css'
import './Resume.css'

function Resume() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="page">
      <FloatingSprites showCat={false} />
      <div className="resume-header">
        <h1>Resume</h1>
        <div className="resume-download">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Download CV (PDF)
          </button>
          <AnimatedSprite row={3} frameCount={10} size={60} className="resume-cat" />
        </div>
        {isModalOpen && (
          <CvDownloadModal onClose={() => setIsModalOpen(false)} />
        )}
      </div>

      <div className="resume-section">
        <h2>Experience</h2>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>Project Manager — Ticketnation Philippines / Experia</h3>
            <span className="resume-dates">Jan 2026 – Mar 2026</span>
          </div>
          <ul>
            <li>
              Worked as Project Manager, directing event logistics,
              sponsorship outreach, and stakeholder communication.
            </li>
            <li>
              Executed QA testing for the web platform, documenting
              technical issues and recommending functional enhancements to
              the engineering team.
            </li>
          </ul>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>Marketing &amp; Listings — Philbest Properties</h3>
            <span className="resume-dates">May 2023 – Part-time</span>
          </div>
          <ul>
            <li>
              Curated and updated real estate listings on the official
              website and multiple social media channels.
            </li>
            <li>
              Produced creative marketing assets, including the graphic
              design and layout of promotional brochures.
            </li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2>Projects</h2>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>UI/UX Designer — Booking Adventure Website</h3>
            <span className="resume-dates">Figma · May 2025</span>
          </div>
          <ul>
            <li>
              Conceptualized and executed a modern website redesign,
              integrating contemporary aesthetics with current technological
              standards.
            </li>
            <li>Collaborated effectively within a three-person team to deliver the project.</li>
          </ul>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>Frontend Developer — Web Mapping</h3>
            <span className="resume-dates">HTML &amp; CSS · Nov 2024</span>
          </div>
          <ul>
            <li>
              Developed a personal website themed around favorite Korean web
              comics (manhwa).
            </li>
            <li>
              Gained significant technical expertise in HTML and CSS through
              the creation of a responsive, web-friendly platform.
            </li>
          </ul>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>UI/UX Designer — Fitness Gym Application</h3>
            <span className="resume-dates">Figma · Sep 2023 – Dec 2023</span>
          </div>
          <ul>
            <li>Designed and detailed a comprehensive fitness application using Figma.</li>
            <li>Facilitated the formal presentation of the application design and its core features.</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2>Volunteer Experience</h2>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>Volunteer Event Facilitator — DLSU Devcon Kids</h3>
            <span className="resume-dates">Sep 2024</span>
          </div>
          <ul>
            <li>
              Coordinated event logistics to ensure smooth operations while
              maintaining high levels of student engagement.
            </li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2>Education</h2>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>Bachelor of Science in Information Technology — Rizal Technological University</h3>
            <span className="resume-dates">2023 – Present</span>
          </div>
        </div>
        <div className="resume-entry">
          <div className="resume-entry-header">
            <h3>STEM — Arellano University</h3>
            <span className="resume-dates">2020 – 2023</span>
          </div>
          <ul>
            <li>Academic Distinction: Graduated with High Honors</li>
          </ul>
        </div>
      </div>

      <div className="resume-section">
        <h2>Technical Expertise</h2>
        <p>Cascading Style Sheets (CSS), User Interface &amp; User Experience Design, HyperText Markup Language (HTML)</p>
      </div>

      <div className="resume-section">
        <h2>Proficiency in Software Tools</h2>
        <p>Figma, Visual Studio Code, GitHub, Canva, Jira, Asana</p>
      </div>
    </section>
  )
}

export default Resume
