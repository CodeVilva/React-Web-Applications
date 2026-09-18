import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => [
      ...prevCart,
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      },
    ]);
  };

  const removeFromCart = (itemIndex) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== itemIndex));
  };

  const clearCart = () => {
    setCart([]);
  };

      function putitem(product){
          if (quantity <= 0) {
              alert("Please select a quantity of at least 1");
              return;
          }
          
          addToCart(product, quantity);
          alert(`Added ${product.name} (Qty: ${quantity}) to cart!`);
          setQuantity(1);
      }

      function increaseQuant(product){
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 0) + 1 }
              : item
          )
        );
        }
        function decreaseQuant(product){
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: (item.quantity || 0) - 1 }
              : item
          )
        );
      }

  const value = {
    cart,
    quantity,
    increaseQuant,
    decreaseQuant,
    setQuantity,
    addToCart,
    removeFromCart,
    clearCart,
    putitem
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}
