import { Brightness4, Brightness7 } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface HeaderProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, mode }: HeaderProps) => {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const cartItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: isScrolled
          ? mode === "light"
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(30, 30, 30, 0.8)"
          : "background.paper",
        color: "text.primary",
        boxShadow: isScrolled
          ? "0 4px 8px rgba(0,0,0, 0.15)"
          : "0 2px 4px rgba(0,0,0,0.1)",
        backdropFilter: isScrolled ? "blur(10px)" : "none",
        transition: "all 0.3s ease",
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Логотип */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            color: "#ff6200",
            textDecoration: "none",
          }}
        >
          Dodo Pizza
        </Typography>

        {/* Навигация */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            component={Link}
            to="/menu"
            sx={{
              color: "text.primary",
              textDecoration: "none",
              "&:hover": { color: "#ff6200" },
            }}
          >
            Меню
          </Typography>
        </Box>

        {/* Корзина и переключение темы */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={() => navigate("/cart")} aria-label="cart">
            <Badge badgeContent={cartItemsCount} color="error">
              <ShoppingCartIcon sx={{ color: "text.primary" }} />
            </Badge>
          </IconButton>
          <Typography sx={{ mr: 2 }}>{totalPrice} ₽</Typography>
          <IconButton
            onClick={toggleTheme}
            sx={{
              transition: "transform 0.3s ease",
              transform: mode === "dark" ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            {mode === "dark" ? (
              <Brightness7 sx={{ color: "text.primary" }} />
            ) : (
              <Brightness4 sx={{ color: "text.primary" }} />
            )}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
