import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return(
        <>
            <footer className="footer">
                <hr aria-orientation="horizontal" className="footer-hr" />
                <div className="footer-grid">
                    <div className="footer-grid-box">
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/about" className="footer-link">About</Link>
                        <Link to="/projects" className="footer-link">Projects</Link>
                    </div>
                    <div className="footer-grid-box">
                        <Link to="https://github.com/Bloectasy" className="footer-link" target="_blank">Github</Link>
                        <Link to="https://open.spotify.com/user/ysse2vavhoqu9o6nvb0my3ckx" className="footer-link" target="_blank">Spotify</Link>
                    </div>
                    <div className="footer-grid-box">
                        <Link to="/setup" className="footer-link">Setup</Link>
                    </div>
                </div>
            </footer>
        </>
    )
}