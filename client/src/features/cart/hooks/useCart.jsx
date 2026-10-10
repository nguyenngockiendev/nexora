import { createContext, useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [userId, setUserId] = useState(
    () => localStorage.getItem("userId") || "guest",
  );
  const [cartItems, setCartItems] = useState([]);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    const checkUser = () => {
      const currentId = localStorage.getItem("userId") || "guest";
      setUserId((prev) => (prev !== currentId ? currentId : prev));
    };

    const interval = setInterval(checkUser, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    isLoadedRef.current = false;
    const key = `cart_${userId}`;
    const localData = localStorage.getItem(key);
    setCartItems(localData ? JSON.parse(localData) : []);
    isLoadedRef.current = true;
  }, [userId]);

  useEffect(() => {
    if (isLoadedRef.current) {
      const key = `cart_${userId}`;
      localStorage.setItem(key, JSON.stringify(cartItems));
    }
  }, [cartItems, userId]);

  const addToCart = (course) => {
    setCartItems((prevItems) => {
      const isExist = prevItems.find((item) => item._id === course._id);
      if (isExist) {
        toast.info("khóa học đã ở trong giỏ hàng");
        return prevItems;
      }
      toast.success("đã thêm khóa học vào giỏ hàng thành công!");
      return [...prevItems, course];
    });
  };

  const removeFromCart = (courseId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== courseId),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart phải được sử dụng bên trong CartProvider");
  }
  return context;
};
