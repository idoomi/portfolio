import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import SideNav from './components/SideNav.jsx'
import HeroScene from './components/scene/HeroScene.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Resume from './pages/Resume.jsx'
import Contact from './pages/Contact.jsx'
import './App.css'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [stage, setStage] = useState('fadeIn')
  const isHome = location.pathname === '/'

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setStage('fadeOut')
    }
  }, [location, displayLocation])

  return (
    <div className="app-shell">
      <div className="scene-backdrop" aria-hidden="true" />
      <div className="persistent-scene" aria-hidden="true">
        <HeroScene interactive={isHome} />
      </div>
      <Navbar />
      <SideNav />
      <div
        className={`page-fade page-fade-${stage}${isHome ? ' page-fade-home' : ''}`}
        onClick={(event) => {
          if (isHome) return
          const hitInteractive = event.target.closest('a, button, input, textarea, select')
          if (!hitInteractive) {
            navigate('/')
          }
        }}
        onTransitionEnd={() => {
          if (stage === 'fadeOut') {
            setDisplayLocation(location)
            setStage('fadeIn')
          }
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
