import Navigation from "../Navigation/Navigation";
import { useTheme } from "../../context/ThemeContext";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <div className="container header__content">
        <span className="logo">MovieSearch</span>
        <div className="header__actions">
          <Navigation />
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
