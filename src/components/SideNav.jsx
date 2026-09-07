import { NavLink, useLocation } from 'react-router-dom'
import './SideNav.css'

const links = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

function SideNav() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <nav className={isHome ? 'side-nav side-nav-pop' : 'side-nav'}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? 'side-nav-link active' : 'side-nav-link'
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default SideNav
