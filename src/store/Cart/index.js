import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const useCartStore = create(
  devtools(
    persist(
      (set) => ({
        cart: [],
        resetCart: () => set(() => ({ cart: [] })),
        setCart: (value) => set({ cart: value }),
        addToCart: (productToAdd) => {
          set((state) => {
            const productIndex = state.cart.findIndex((item) => item._id === productToAdd._id);
            if (productIndex !== -1) {
              const newCart = state.cart.map((item, index) => 
                index === productIndex ? { ...item, quantity: item.quantity + 1 } : item);
              return { cart: newCart };
            } else {
              const newProduct = { ...productToAdd, quantity: 1 };
              return { cart: [...state.cart, newProduct] };
            }
          });
        },
        increaseQuantity: (product) =>
          set((state) => ({
            cart: state.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          })),
        decreaseQuantity: (product) =>
          set((state) => ({
            cart: state.cart
              .map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
              .filter((item) => item.quantity > 0),
          })),
      }),
      {
        name: "cart",
        getStorage: () => localStorage,
      }
    )
  )
);

export default useCartStore;
