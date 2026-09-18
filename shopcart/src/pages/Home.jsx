import Navbar from "../components/Navbar"
import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
            <Navbar />
            <div className="container">
                <div className="home-hero">
                    <h1>Welcome to ShopKart</h1>
                    <p className="home-hero-text">
                        Discover the finest collection of tech gadgets and accessories. 
                        From laptops to gaming gear, find everything you need at unbeatable prices.
                    </p>
                    <Link to="/products" className="view-link" style={{marginTop: "1.5rem", display: "inline-block"}}>
                        Shop Now →
                    </Link>
                </div>
            </div>
        </>
    )
}