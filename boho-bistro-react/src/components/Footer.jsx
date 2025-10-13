import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
      <div className="container-fluid">
        <Link className="navbar-brand logo" to="/">
          <img src="/assets/updated-logo.png" alt="Boho Bistro Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
                <svg viewBox="0 0 100 50"><ellipse cx="50" cy="25" rx="45" ry="20"></ellipse></svg>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About Us
                <svg viewBox="0 0 100 50"><ellipse cx="50" cy="25" rx="45" ry="20"></ellipse></svg>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/menu">
                Menu
                <svg viewBox="0 0 100 50"><ellipse cx="50" cy="25" rx="45" ry="20"></ellipse></svg>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/reservation">
                Reservation
                <svg viewBox="0 0 100 50"><ellipse cx="50" cy="25" rx="45" ry="20"></ellipse></svg>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/gallery">
                Gallery
                <svg viewBox="0 0 100 50"><ellipse cx="50" cy="25" rx="45" ry="20"></ellipse></svg>
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact Us
                <svg viewBox="0 0 100 50"><ellipse cx="50" cy="25" rx="45" ry="20"></ellipse></svg>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
