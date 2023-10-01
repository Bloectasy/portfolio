import logo from "../../images/panda_logo.png"
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const location = useLocation().pathname;

  return (
    <>
    <nav className="nav">
      <div>
        <img className="nav-img" src={logo} alt=""/>
      </div>
      <div className="nav-links">
        <Link className={location == "/" ? "nav-link nav-link-selected" : "nav-link"} to="/">Home</Link>
        <Link className={location == "/about" ? "nav-link nav-link-selected" : "nav-link"} to="/about">About</Link>
        <Link className={location == "/projects" ? "nav-link nav-link-selected" : "nav-link"} to="/projects">Projects</Link>
      </div>
    </nav>
    </>
  )
}
