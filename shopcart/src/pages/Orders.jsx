import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Orders(){
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('orders') || '[]');
        setOrders(stored);
    }, []);

    function clearOrders(){
        localStorage.removeItem('orders');
        setOrders([]);
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="page-header">
                    <h2>Orders</h2>
                    <p className="page-subheader">Your past orders</p>
                </div>

                {orders.length === 0 ? (
                    <div className="cart-empty">
                        <p>No orders yet.</p>
                        <Link to="/products" className="view-link" style={{marginTop: '1rem'}}>Start Shopping</Link>
                    </div>
                ) : (
                    <div className="orders-list">
                        <div style={{marginBottom: '1rem'}}>
                            <button className="clearbtn" onClick={clearOrders}>Clear Orders</button>
                        </div>
                        {orders.map((order) => (
                            <div key={order.id} className="checkout-item">
                                <div style={{flex: 1}}>
                                    <p style={{fontWeight: 700}}>Order #{order.id}</p>
                                    <p style={{color: '#666', fontSize: '0.9rem'}}>Placed: {new Date(order.date).toLocaleString()}</p>
                                    <div style={{marginTop: '0.5rem'}}>
                                        {order.items.map((it, idx) => (
                                            <div key={`${it.id}-${idx}`} style={{display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0'}}>
                                                <div>{it.name} × {it.quantity}</div>
                                                <div>Rs. {(it.price * it.quantity).toLocaleString()}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div style={{textAlign: 'right'}}>
                                    <p style={{fontWeight: 700}}>Total</p>
                                    <p style={{color: '#667eea'}}>Rs. {order.total.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
