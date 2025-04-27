import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Добро пожаловать в Dodo Pizza! 🍕
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        component="p"
        sx={{ mb: 2 }}
      >
        Закажите вкусную пиццу прямо сейчас!
      </Typography>
      <Button
        component={Link}
        to="/menu"
        variant="contained"
        color="primary"
        size="large"
      >
        Перейти в меню
      </Button>
    </Container>
  );
}
