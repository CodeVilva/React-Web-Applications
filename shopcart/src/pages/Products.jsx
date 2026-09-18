import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";


export default function Products({ products = [] }) {
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="page-header">
                    <h2>Best Selling Products</h2>
                    <p className="page-subheader">Browse our collection of premium tech gadgets</p>
                </div>
                <div className="products-grid">
                    {products.map((item) => (
                        <div key={item.id} className="product-card">
                            <p className="product-name">{item.name}</p>
                            <p className="product-description">{item.description}</p>
                            <p className="product-price">Rs. {item.price.toLocaleString()}</p>
                            <Link to={"/products/" + item.id} className="view-link">View Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
