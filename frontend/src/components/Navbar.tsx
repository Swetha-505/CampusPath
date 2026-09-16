import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <Link to="/" className="logo" aria-label="CampusPath home">
        <span aria-hidden="true">🎓</span>
        <span>CampusPath</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end className={navClass}>
          Home
        </NavLink>

        <NavLink to="/resources" className={navClass}>
          Resources
        </NavLink>

        <NavLink to="/exams" className={navClass}>
          Exams
        </NavLink>

        <NavLink to="/discussion" className={navClass}>
          Discussions
        </NavLink>

        <NavLink to="/placements" className={navClass}>
          Placements
        </NavLink>
      </div>

      <NavLink to="/profile" className="profile-btn">
        Profile
      </NavLink>
    </nav>
  );
}

export default Navbar;
