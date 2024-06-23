import create from "zustand";
import { devtools, persist } from "zustand/middleware";

const stateTransformer = (state) => {
  return Object.fromEntries(
    Object.entries(state).filter(([key]) => typeof state[key] !== "function")
  );
};

const useCartStore = create(
  devtools(
    persist(
      (set) => ({
        cart: [],
        setCart: (value) => set({ cart: value }),
        addToCart: (productToAdd) => {
          set((state) => {
            const productIndex = state.cart.findIndex((item) => item._id === productToAdd._id);
            if (productIndex !== -1) {
              // Product is already in the cart, increase the quantity
              const newCart = state.cart.map((item, index) => 
                index === productIndex ? { ...item, quantity: item.quantity + 1 } : item);
              return { cart: newCart };
            } else {
              // Product is not in the cart, add with quantity of 1
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
        serialize: stateTransformer,
        deserialize: stateTransformer,
      }
    )
  )
);

// const useCartStore = create((set) => ({
//     cart: [],
//     setCart: (value) => set({ cart: value }),
//   }));

export default useCartStore;
