import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductItem from "./pages/ProductItem";
import CartSummary from "./pages/CartSummary";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import { CartProvider } from "./context/CartContext";
import "./App.css";

const products = [
  { id: 1, name: "Laptop", price: 50000, description: "High-performance laptop for work and gaming." },
  { id: 2, name: "Mouse", price: 2000, description: "Ergonomic wireless optical mouse." },
  { id: 3, name: "Keyboard", price: 3000, description: "Mechanical backlit keyboard with tactile switches." },
  { id: 4, name: "Monitor", price: 12000, description: "24-inch Full HD display with 75Hz refresh rate." },
  { id: 5, name: "Headphones", price: 4500, description: "Over-ear wireless headphones with active noise cancellation." },
  { id: 6, name: "Webcam", price: 3500, description: "1080p HD webcam with built-in microphone for streaming." },
  { id: 7, name: "External Hard Drive", price: 6000, description: "2TB portable external hard drive for data backup." },
  { id: 8, name: "USB Flash Drive", price: 8000, description: "128GB USB 3.2 high-speed flash drive." },
  { id: 9, name: "Graphic Tablet", price: 7500, description: "Digital drawing tablet with battery-free stylus." },
  { id: 10, name: "Desk Mat", price: 1200, description: "Extended large gaming mouse pad with stitched edges." },
  { id: 11, name: "HDMI Cable", price: 500, description: "6-foot high-speed HDMI cable supporting 4K resolution." },
  { id: 12, name: "Laptop Stand", price: 2500, description: "Ergonomic aluminum stand for improved cooling and viewing." },
  { id: 13, name: "Bluetooth Speaker", price: 4000, description: "Portable waterproof speaker with 12-hour battery life." },
  { id: 14, name: "Wireless Charger", price: 1800, description: "15W fast wireless charging pad for smartphones." },
  { id: 15, name: "Power Bank", price: 3000, description: "20000mAh portable charger with dual USB outputs." },
  { id: 16, name: "USB-C Hub", price: 3200, description: "7-in-1 multi-port adapter with HDMI and SD card reader." },
  { id: 17, name: "Gaming Chair", price: 18000, description: "Ergonomic leather chair with lumbar support and recline." },
  { id: 18, name: "Smartwatch", price: 15000, description: "Fitness tracker with heart rate monitor and GPS." },
  { id: 19, name: "Microphone", price: 5500, description: "USB condenser microphone for podcasting and gaming." },
  { id: 20, name: "Router", price: 4500, description: "Dual-band Wi-Fi 6 router for high-speed internet." },
  { id: 21, name: "Soundbar", price: 10000, description: "Compact TV soundbar with built-in subwoofer." },
  { id: 22, name: "Ring Light", price: 2200, description: "10-inch LED ring light with tripod stand for creators." },
  { id: 23, name: "Printer", price: 11000, description: "All-in-one wireless inkjet printer, scanner, and copier." },
  { id: 24, name: "VR Headset", price: 35000, description: "Standalone virtual reality headset with motion controllers." },
  { id: 25, name: "Cooling Pad", price: 1500, description: "Laptop cooling pad with five quiet LED fans." },
  { id: 26, name: "Uninterruptible Power Supply (UPS)", price: 6500, description: "600VA backup power supply with surge protection." },
  { id: 27, name: "Thermal Paste", price: 600, description: "High-performance thermal compound for CPU cooling." },
  { id: 28, name: "Cable Organizer", price: 400, description: "Silicone magnetic cable clips for neat desk management." }
];

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/products/:id" element={<ProductItem products={products} />} />
          <Route path="/cart" element={<CartSummary />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;