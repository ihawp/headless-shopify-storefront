import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
    return <header>
        <nav aria-label="Main Site Navigation">
            <ul>
                <li>
                    <NavLink to="/" title="Home">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/faq" title="FAQs">FAQs</NavLink>
                </li>
                <li>
                    <NavLink to="/shop" title="Shop">Shop</NavLink>
                </li>
                <li>
                    <NavLink to="/cart" title="Cart">Cart</NavLink>
                </li>
            </ul>
        </nav>
        <SearchBar />
    </header>;
}