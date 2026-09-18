import Navbar from "../components/Navbar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function CartSummary(){
    const { cart, removeFromCart, clearCart, increaseQuant, decreaseQuant } = useContext(CartContext);
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return(
        <>
            <Navbar />
            <div className="container">
                <div className="cart-container">
                    <h2 className="page-header" style={{marginTop: 0}}>Shopping Cart</h2>
                    
                    {cart.length === 0 ? (
                        <div className="cart-empty">
                            <p style={{fontSize: "1.2rem"}}>Your cart is empty</p>
                            <p>Start shopping to add items to your cart!</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cart.map((item, index) => (
                                    <div key={`${item.id}-${index}`} className="cart-item">
                                        <div className="cart-item-info">
                                            <p className="cart-item-name">{item.name}</p>
                                            <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="cart-quantity-selector">
                                            <button
                                                onClick={() => decreaseQuant(item)}
                                                disabled={item.quantity < 2}
                                            > − </button>
                                            <span className="cart-quantity-display">{item.quantity}</span>
                                            <button
                                                onClick={() => increaseQuant(item)}
                                                disabled={item.quantity > 9}
                                            > + </button>
                                        </div>
                                        <div className="cart-item-price">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                                        <button className="deleteItem" onClick={() => removeFromCart(index)}> 🗑️ Remove </button>
                                    </div>
                                ))}
                            </div>
                            <div className="cart-items">
                                <button className="clearbtn" onClick={clearCart}>Clear Cart</button>
                            </div>
                            <div className="cart-summary">
                                <p className="cart-total-label">Total Price:</p>
                                <p className="cart-total-price">Rs. {totalPrice.toLocaleString()}</p>
                            </div>
                            <div className="cart-actions" style={{marginTop: '1rem'}}>
                                <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}