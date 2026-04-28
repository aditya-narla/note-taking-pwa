import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="header">
            <Link to="/">Pet Pals Pack</Link>
        </header>
    );
}

export default Header;