import Navbar from "../components/Navbar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Checkout(){
    const { cart, clearCart } = useContext(CartContext);
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    function confirmOrder(){
        if(cart.length === 0){
            alert('Your cart is empty');
            return;
        }

        const order = {
            id: Date.now(),
            items: cart,
            total: totalPrice,
            date: new Date().toISOString(),
        };

        const existing = JSON.parse(localStorage.getItem('orders') || '[]');
        existing.unshift(order);
        localStorage.setItem('orders', JSON.stringify(existing));

        alert(`Order placed! Total: Rs. ${totalPrice.toLocaleString()}`);
        clearCart();
        navigate('/orders');
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="page-header">
                    <h2>Checkout</h2>
                    <p>Review your items and confirm your order.</p>
                </div>

                {cart.length === 0 ? (
                    <div style={{padding: '2rem'}}>
                        <p>Your cart is empty.</p>
                    </div>
                ) : (
                    <div className="checkout-summary">
                        <div className="checkout-items">
                            {cart.map((item, idx) => (
                                <div key={`${item.id}-${idx}`} className="checkout-item">
                                    <div>
                                        <p className="cart-item-name">{item.name}</p>
                                        <p className="cart-item-quantity">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="cart-item-price">Rs. {(item.price * item.quantity).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>

                        <div className="cart-summary">
                            <p className="cart-total-label">Total Price:</p>
                            <p className="cart-total-price">Rs. {totalPrice.toLocaleString()}</p>
                        </div>

                        <div style={{marginTop: '1rem'}}>
                            <button className="confirm-btn" onClick={confirmOrder}>Confirm Order</button>
                            <button style={{marginLeft: '0.5rem'}} onClick={() => navigate(-1)}>Back</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
