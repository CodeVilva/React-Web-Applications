import { useState } from "react";
import "./App.css";

const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

function App() {
  const users = [
    {
      id: 1,
      name: "Vilva",
      contact: 6374383684,
      address: {
        flatno: 23,
        street: "Amman Kovil Street, Vilvanagar",
        city: "Cuddalore",
        pincode: 607001,
      },
    },
  ];

  const products = [
    { id: 1, name: "Laptop", price: 35000, rating: 5.4 },
    { id: 2, name: "IPhone", price: 80000, rating: 5.4 },
    { id: 3, name: "Smart Watch", price: 10000, rating: 5.4 },
    { id: 4, name: "Ear Buds", price: 1500, rating: 5.4 },
    { id: 5, name: "Smart Phone", price: 35000, rating: 5.4 },
    { id: 6, name: "IPad", price: 65000, rating: 5.4 },
  ];

  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("products");
  const [coupons, setCoupons] = useState([
    { id: 1, name: "Amazon coupon 50% off", offer: 50, status: "ACTIVE" },
    { id: 2, name: "Spotify coupon 30% off", offer: 30, status: "ACTIVE" },
    { id: 3, name: "Meesho coupon 10% off", offer: 10, status: "ACTIVE" },
  ]);
  const [activeCoupon, setActiveCoupon] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const couponDiscount = activeCoupon ? subtotal * (activeCoupon.offer / 100) : 0;
  const totalPrice = Math.max(0, subtotal - couponDiscount);

  function viewProducts() {
    setPage("products");
  }

  function viewCart() {
    setPage("cart");
  }

  function addProduct(product) {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  }

  function increaseItem(product) {
    addProduct(product);
  }

  function decreaseItem(product) {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);

      if (!exists) return prevCart;

      if (exists.quantity <= 1) {
        return prevCart.filter((item) => item.id !== product.id);
      }

      return prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  }

  function removeProduct(id) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }

  function applyCoupon(coupon) {
    if (activeCoupon && activeCoupon.id === coupon.id) return;

    setCoupons((prevCoupons) =>
      prevCoupons.map((item) =>
        item.id === coupon.id ? { ...item, status: "EXPIRED" } : item
      )
    );

    setActiveCoupon(coupon);
  }

  const payment = () => {
    if (cart.length > 0) {
      setPage("Payment");
    }
  };

  const confirmPayment = () => {
    if (cart.length === 0) return;

    const createdOrder = {
      id: `ORD-${Date.now()}`,
      date: new Date().toLocaleString(),
      customer: users[0],
      items: cart.map((item) => ({ ...item })),
      subtotal,
      discount: couponDiscount,
      total: totalPrice,
    };

    setOrderDetails(createdOrder);
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) => ({ ...coupon, status: "ACTIVE" }))
    );
    setActiveCoupon(null);
    setCart([]);
    setPage("success");
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="logo">SHOPKART</div>

        <nav className="navLinks">
          <button className="nav-btn" onClick={viewProducts}>
            Products
          </button>
          <button className="nav-btn cart-btn" onClick={viewCart}>
            Cart <span>{itemsCount}</span>
          </button>
        </nav>
      </header>

      {page === "products" && (
        <section className="product-page">
          <div className="section-title-row">
            <h2>Our Products</h2>
          </div>

          <div className="productContainer">
            {products.map((product) => {
              const productQty = cart.find((item) => item.id === product.id)?.quantity || 0;

              return (
                <article key={product.id} className="product-card">
                  <div className="product-image">
                    <span>{product.name.slice(0, 2).toUpperCase()}</span>
                  </div>

                  <p className="productName">{product.name}</p>

                  <div className="product-meta">
                    <p className="productPrice">{formatPrice(product.price)}</p>
                    <p className="ProductRating">⭐ {product.rating}</p>
                  </div>

                  <div className="itemscounter">
                    <button onClick={() => decreaseItem(product)}>-</button>
                    <div>{productQty}</div>
                    <button onClick={() => increaseItem(product)}>+</button>
                  </div>

                  <button className="addCart" onClick={() => addProduct(product)}>
                    {productQty > 0 ? "Add More" : "Add to Cart"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {page === "cart" && (
        <section className="cart-page">
          <div className="cartContainer">
            <div className="cart-header">
              <h3>Cart Items</h3>
              <span>{itemsCount} items</span>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">Your cart is empty.</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-details">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{formatPrice(item.price * item.quantity)}</p>
                  </div>

                  <div className="cart-item-actions">
                    <div className="itemscounter">
                      <button onClick={() => decreaseItem(item)}>-</button>
                      <div>{item.quantity}</div>
                      <button onClick={() => increaseItem(item)}>+</button>
                    </div>

                    <button className="remove-btn" onClick={() => removeProduct(item.id)}>
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}

            <div className="coupon-box">
              <h3>Apply Coupon</h3>

              {coupons
                .filter((coupon) => coupon.status === "ACTIVE")
                .map((coupon) => (
                  <div key={coupon.id} className="coupon-row">
                    <p>{coupon.name}</p>
                    <button
                      className={activeCoupon?.id === coupon.id ? "applied-btn" : "apply-btn"}
                      onClick={() => applyCoupon(coupon)}
                    >
                      {activeCoupon?.id === coupon.id ? "Applied" : "Apply"}
                    </button>
                  </div>
                ))}
            </div>

            <div className="summary-card">
              <div className="price-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <strong>- {formatPrice(couponDiscount)}</strong>
              </div>
              <div className="price-row total-row">
                <span>Total</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <button className="checkout-btn" onClick={payment}>
                Check Out
              </button>
            </div>
          </div>
        </section>
      )}

      {page === "Payment" && (
        <section className="payment-page">
          <div className="payment-container">
            <h2>Order Summary</h2>

            <div className="user-details">
              <h3>User Details</h3>
              {users.map((user) => (
                <div key={user.id}>
                  <p>
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p>
                    <strong>Contact:</strong> {user.contact}
                  </p>
                  <p>
                    <strong>Address:</strong>
                  </p>
                  <p>Flat No. {user.address.flatno}</p>
                  <p>Area/Street: {user.address.street}</p>
                  <p>City: {user.address.city}</p>
                  <p>Pincode: {user.address.pincode}</p>
                </div>
              ))}
            </div>

            <div className="payment-details">
              <h3>Payment Details</h3>
              <div className="price-row">
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="price-row">
                <span>Discount</span>
                <strong>- {formatPrice(couponDiscount)}</strong>
              </div>
              <div className="price-row total-row">
                <span>Total Amount</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>
            </div>

            <div className="order-items">
              <h3>Order Items</h3>
              {cart.map((item) => (
                <div key={item.id} className="order-item">
                  <p>{item.name}</p>
                  <p>Qty: {item.quantity}</p>
                  <p>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="payment-actions">
              <button className="confirm-btn" onClick={confirmPayment}>
                Confirm Payment
              </button>
              <button className="back-btn" onClick={viewCart}>
                Back to Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {page === "success" && orderDetails && (
        <section className="success-page">
          <div className="success-card">
            <div className="success-icon">
              <span>✓</span>
            </div>

            <h2>Payment Successful</h2>
            <p className="success-subtitle">
              Your order has been placed successfully.
            </p>

            <div className="success-summary">
              <div className="summary-row">
                <span>Order ID</span>
                <strong>{orderDetails.id}</strong>
              </div>
              <div className="summary-row">
                <span>Date</span>
                <strong>{orderDetails.date}</strong>
              </div>
              <div className="summary-row">
                <span>Customer</span>
                <strong>{orderDetails.customer.name}</strong>
              </div>
              <div className="summary-row">
                <span>Total Paid</span>
                <strong>{formatPrice(orderDetails.total)}</strong>
              </div>
            </div>

            <div className="success-items">
              <h3>Purchased Items</h3>
              {orderDetails.items.map((item) => (
                <div key={item.id} className="success-item">
                  <span>{item.name}</span>
                  <span>Qty: {item.quantity}</span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <button className="continue-btn" onClick={viewProducts}>
              Continue Shopping
            </button>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;