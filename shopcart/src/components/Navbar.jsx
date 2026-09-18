
import { Link } from "react-router-dom";

export default function Navbar(){
    return(
        <nav className="navbar">
            <div className="navbar-brand">
                ShopKart
            </div>
            <ul className="navbar-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/cart">Cart</Link></li>
            </ul>
        </nav>
    )
}