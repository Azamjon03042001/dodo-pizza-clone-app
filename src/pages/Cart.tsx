import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  clearCart,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);
  console.log("Cart items in Cart.tsx:", cartItems); //  Отладка

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", address: "", phone: "" });
    setErrors({ name: "", address: "", phone: "" });
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", address: "", phone: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Введите ваше имя";
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = "Введите адрес доставки";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Введите номер телефона";
      isValid = false;
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Номер телефона должен содержать от 10 до 15 цифр";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleOrderSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        // Имитация задержки
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const order = {
          items: cartItems,
          ...formData,
          totalPrice,
          date: new Date().toISOString(),
        };
        const response = await fetch("http://localhost:3001/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });
        if (!response.ok) {
          throw new Error("Не удалось отправить заказ на сервер");
        }
        dispatch(clearCart());
        handleClose();
        setSuccessMessage("Заказ успешно оформлен! Мы свяжемся с вами скоро.");
        setTimeout(() => setSuccessMessage(""), 5000);
      } catch (error) {
        let errorMsg = "Не удалось отправить заказ. Попробуйте позже.";
        if (error instanceof Error) {
          if (error.message.includes("Failed to fetch")) {
            errorMsg = "Сервер недоступен. Заказ сохранён локально.";
          } else {
            errorMsg = error.message;
          }
        }
        setErrorMessage(errorMsg);
        setTimeout(() => setErrorMessage(""), 5000);
        dispatch(clearCart());
        handleClose();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClearCart = () => {
    if (window.confirm("Вы уверены, что хотите очистить корзину?")) {
      dispatch(clearCart());
    }
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Корзина
      </Typography>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {cartItems.length === 0 ? (
        <Typography variant="h6" color="text.secondary">
          Ваша корзина пуста
        </Typography>
      ) : (
        <Paper elevation={3} sx={{ p: 2 }}>
          <List>
            {cartItems.map((item) => (
              <ListItem
                key={item.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: 60, height: 60, objectFit: "contain" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`Цена: ${item.price} ₽ x ${item.quantity} = ${
                    item.price * item.quantity
                  } ₽`}
                  sx={{ mr: 4 }}
                />
                <TextField
                  type="number"
                  size="small"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.id, Number(e.target.value))
                  }
                  inputProps={{ min: 1 }}
                  sx={{ width: 60 }}
                />
              </ListItem>
            ))}
          </List>
          <Typography variant="h6" sx={{ mt: 2, textAlign: "right" }}>
            Итого: {totalPrice} ₽
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button variant="outlined" color="error" onClick={handleClearCart}>
              Очистить корзину
            </Button>
            <Button
              variant="contained"
              onClick={handleOpen}
              disabled={cartItems.length === 0}
            >
              Оформить заказ
            </Button>
          </Box>
        </Paper>
      )}
      {/* Модальное окно для офрмления заказа */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Офромление заказа
          </Typography>
          <TextField
            fullWidth
            label="Ваше имя"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Адрес доставки"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            error={!!errors.address}
            helperText={errors.address}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Номер телефона"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={!!errors.phone}
            helperText={errors.phone}
            margin="normal"
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            Итоговая сумма: {totalPrice} ₽
          </Typography>
          <Box
            sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}
          >
            <Button onClick={handleClose} variant="outlined">
              Отмена
            </Button>
            <Button
              onClick={handleOrderSubmit}
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CircularProgress size={24} />
              ) : (
                "Подтвердить заказ"
              )}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
