import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const stateTransformer = (state) => {
  return Object.fromEntries(
    Object.entries(state).filter(([key]) => typeof state[key] !== 'function')
  )
}

const useAuthStore = create(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        setIsLoggedIn: (value) => set({ isLoggedIn: value }),
      }),
      {
        name: 'auth',
        getStorage: () => localStorage,
        serialize: stateTransformer,
        deserialize: stateTransformer,
      }
    )
  )
)

export default useAuthStore