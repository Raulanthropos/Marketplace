import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import TemporaryDrawer from "./components/Drawer/Drawer.jsx";
import Main from "./components/Main/Main.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Cart from "./components/Cart/Cart.jsx";
// import useAuthStore from "./store/auth/index.js";
// import Navbar from "./components/Navbar/Navbar.jsx";
// import Drawer from "./components/Drawer/Drawer.jsx";

function App() {
  // const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn);

  // React.useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (user !== null) {
  //     setIsLoggedIn(true);
  //   }
  // }, [setIsLoggedIn]);

  return (
    <>
        <div className="App">
          <TemporaryDrawer />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
    </>
  );
}

export default App;
