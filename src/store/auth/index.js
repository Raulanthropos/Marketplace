import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

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
      }
    )
  )
)

export default useAuthStore

// import create from 'zustand'
// import { devtools, persist } from 'zustand/middleware'

// const useAuthStore = create(
//   devtools(
//     persist(
//       (set) => ({
//         isLoggedIn: false,
//         accessToken: null,
//         setIsLoggedIn: (value) => set({ isLoggedIn: value }),
//         setAccessToken: (token) => set({ accessToken: token }),
//       }),
//       {
//         name: 'auth',
//         getStorage: () => localStorage,
//       }
//     )
//   )
// )

// export default useAuthStore
