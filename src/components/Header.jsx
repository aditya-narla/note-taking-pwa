import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <span>Pet Pals Pack</span>
            <Link to="/create">+</Link>
        </header>
    );
}

export default Header;