import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        🎓 CampusPath
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/exams">Exams</Link>
        <Link to="/discussion">Discussions</Link>
        <Link to="/placements">Placements</Link>
      </div>

      <Link to="/profile" className="profile-btn">
        Profile
      </Link>
    </nav>
  );
}

export default Navbar;