import './Page.css'

function Contact() {
  return (
    <section className="page">
      <h1>Get In Touch</h1>
      <p>
        I'm currently open to new opportunities. Whether you have a question
        or just want to say hi, I'll try my best to get back to you.
      </p>
      <div className="contact-links">
        <a href="mailto:amarmariannadine@gmail.com" className="btn btn-primary">
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
      </div>
    </section>
  )
}

export default Contact
