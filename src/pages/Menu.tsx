import { Container, Grid, Typography } from "@mui/material";
import PizzaCard from "../components/PizzaCard";
import { useAppSelector } from "../store/hooks";

export default function Menu() {
  const { pizzas } = useAppSelector((state) => state.menu);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Меню
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          display: "grid",
          justifyItems: "center",
          gridTemplateColumns: {
            xs: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          columnGap: 3,
          rowGap: 7,
        }}
      >
        {pizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </Grid>
    </Container>
  );
}
// import {
//   Alert,
//   Box,
//   CircularProgress,
//   Container,
//   Grid,
//   Typography,
// } from "@mui/material";
// import { useEffect } from "react";
// import PizzaCard from "../components/PizzaCard";
// import { fetchPizzas } from "../features/menu/menuSlice";
// import { useAppDispatch, useAppSelector } from "../store/hooks";

// export default function Menu() {
//   const dispatch = useAppDispatch();
//   const { pizzas, loading, error } = useAppSelector((state) => state.menu);

//   useEffect(() => {
//     dispatch(fetchPizzas());
//   }, [dispatch]);

//   return (
//     <Container sx={{ py: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Меню
//       </Typography>
//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : error ? (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           {error}
//         </Alert>
//       ) : (
//         <Grid
//           container
//           spacing={3}
//           sx={{
//             display: "grid",
//             justifyItems: "center",
//             gridTemplateColumns: {
//               xs: "repeat(1, 1fr)",
//               sm: "repeat(2, 1fr)",
//               md: "repeat(3, 1fr)",
//               lg: "repeat(4, 1fr)",
//             },
//             columnGap: 3,
//             rowGap: 7,
//           }}
//         >
//           {pizzas.map((pizza) => (
//             <PizzaCard key={pizza.id} pizza={pizza} />
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// }
