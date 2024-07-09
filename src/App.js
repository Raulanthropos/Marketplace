import React from "react";
import "./App.css";
import Footer from "./components/Footer/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import TemporaryDrawer from "./components/Drawer/Drawer.jsx";
import Main from "./components/Main/Main.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Cart from "./components/Cart/Cart.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
// import Navbar from "./components/Navbar/Navbar.jsx";
// import Drawer from "./components/Drawer/Drawer.jsx";

function App() {

  return (
    <>
        <div className="App">
          <TemporaryDrawer />
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
    </>
  );
}

export default App;
