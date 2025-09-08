import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav__brand">The Barabari Collective</div>
      <div className="nav__links">
        <NavLink to="/careers" className={({ isActive }) => (isActive ? "link link--active" : "link")}>
          Careers
        </NavLink>
      </div>
    </nav>
  );
}
