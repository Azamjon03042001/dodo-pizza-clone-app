import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { addToCart } from "../features/cart/cartSlice";
import { Pizza } from "../features/menu/types";
import { useAppDispatch } from "../store/hooks";

interface PizzaCardProps {
  pizza: Pizza;
}

const PizzaCard: React.FC<PizzaCardProps> = ({ pizza }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    console.log("Dispatching addToCart:", { ...pizza, quantity: 1 }); // отладка
    dispatch(addToCart({ ...pizza, quantity: 1 }));
  };

  return (
    <Card
      sx={{
        maxWidth: 233,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "transparent",
        border: "none",
        boxShadow: "none",
      }}
    >
      <div>
        <CardMedia
          component="img"
          height="220"
          image={pizza.image}
          alt={pizza.name}
          sx={{
            marginTop: "8px",
            objectFit: "contain",
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
        <CardContent
          sx={{
            padding: 0,
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              mb: 1,
              mt: 1,
            }}
          >
            {pizza.name}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {pizza.description}
          </Typography>
        </CardContent>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">от {pizza.price} ₽</Typography>
        <Button
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            bgcolor: "#ff6200",
            color: "white",
            borderRadius: 2,
            textTransform: "none",
            "&:hover": { bgcolor: "#e55a00" },
          }}
        >
          Выбрать
        </Button>
      </div>
    </Card>
  );
};

export default PizzaCard;
