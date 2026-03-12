import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
            <Link to="/" className="navbar__logo">
                NETFLIX
            </Link>
            <ul className="navbar__links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/watchlist">My List</Link>
                </li>
                <li>
                    <button className="navbar__logout" onClick={handleLogout}>
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
}
