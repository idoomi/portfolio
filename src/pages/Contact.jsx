import './Page.css'
import FloatingSprites from '../components/FloatingSprites.jsx'

function Contact() {
  return (
    <section className="page">
      <FloatingSprites />
      <h1>Get In Touch</h1>
      <p>
        I'm currently open to new opportunities. Whether you have a question
        or just want to say hi, I'll try my best to get back to you.
      </p>
      <div className="contact-links">
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=amarmariannadine@gmail.com"
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          Say Hello
        </a>
        <a
          href="https://github.com/idoomi"
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/marian-nadine-5113b1331/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary"
        >
          LinkedIn
        </a>
      </div>
    </section>
  )
}

export default Contact
