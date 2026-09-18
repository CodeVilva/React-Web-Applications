import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState, useMemo, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductItem({products}){


    const { quantity, setQuantity, putitem } = useContext(CartContext);

    const  { id } = useParams();

    const product = useMemo(() =>
        products.find((p) => p.id === parseInt(id))
    , [products, id])


    return(
        <>
            <Navbar />
            <div className="container">
                {product ? (
                    <div className="product-detail">
                        <h1 className="product-name">{product.name}</h1>
                        <p className="product-detail-description">{product.description}</p>
                        <p className="product-detail-price">Rs. {product.price.toLocaleString()}</p>
                        
                        <div className="quantity-selector">
                            <button
                                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            > − </button>
                            <span className="quantity-display">{quantity}</span>
                            <button
                                onClick={() => setQuantity((prev) => prev + 1)}
                            > + </button>
                        </div>
                        
                        <button
                            className="add-to-cart-btn"
                            onClick={() => putitem(product)}
                        >Add to Cart</button>
                    </div>
                ) : (
                    <div style={{textAlign: "center", padding: "3rem"}}>
                        <p>Product not found</p>
                    </div>
                )}
            </div>
        </>
    );
}