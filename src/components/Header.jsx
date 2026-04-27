import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <Link to="/">Pet Pals Pack</Link>
            <Link to="/create">+</Link>
        </header>
    );
}

export default Header;