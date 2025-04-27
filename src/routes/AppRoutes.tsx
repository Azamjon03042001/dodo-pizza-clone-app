import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import Menu from "../pages/Menu";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/menu" element={<Menu />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
