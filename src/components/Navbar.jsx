import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="navbar-brand" end>
        Marian Nadine Amar
      </NavLink>
    </header>
  )
}

export default Navbar
