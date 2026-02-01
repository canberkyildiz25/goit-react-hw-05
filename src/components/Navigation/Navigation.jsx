import { NavLink } from "react-router-dom";

const Navigation = () => {
  const getLinkClass = ({ isActive }) =>
    isActive ? "nav__link nav__link--active" : "nav__link";

  return (
    <nav className="nav">
      <NavLink to="/" className={getLinkClass} end>
        Home
      </NavLink>
      <NavLink to="/movies" className={getLinkClass}>
        Movies
      </NavLink>
      <NavLink to="/favorites" className={getLinkClass}>
        Favorites
      </NavLink>
    </nav>
  );
};

export default Navigation;
