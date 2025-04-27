import { createSlice } from "@reduxjs/toolkit";
import { Pizza } from "./types";

import bavarianImage from "../../assets/pizza-images/medium/bavarian.webp";
import blueCheeseImage from "../../assets/pizza-images/medium/blue-cheese.webp";
import carbonaraImage from "../../assets/pizza-images/medium/carbonara.webp";
import cheesyImage from "../../assets/pizza-images/medium/cheesy.webp";
import fourCheeseImage from "../../assets/pizza-images/medium/four-cheese.webp";
import fourSeasonImage from "../../assets/pizza-images/medium/four-season.webp";
import julienImage from "../../assets/pizza-images/medium/julien.webp";
import margaritaImage from "../../assets/pizza-images/medium/margarita.webp";
import meatMixImage from "../../assets/pizza-images/medium/meat-mix.webp";
import meatImage from "../../assets/pizza-images/medium/meat.webp";
import peperoniImage from "../../assets/pizza-images/medium/peperoni.webp";
import pestoImage from "../../assets/pizza-images/medium/pesto.webp";

interface MenuState {
  pizzas: Pizza[];
  loading: boolean;
  error: string | null;
}

// Статические данные как запасной вариант
const mockPizzas: Pizza[] = [
  {
    id: 1,
    name: "Маргарита",
    description:
      "Увеличенная порция моцареллы, томаты, итальянские травы, фирменный томатный соус",
    price: 669,
    image: margaritaImage,
  },
  {
    id: 2,
    name: "Пепперони",
    description:
      "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
    price: 449,
    image: peperoniImage,
  },
  {
    id: 3,
    name: "Баварская",
    description:
      "Баварские колбаски, маринованные огурчики, красный лук, томаты, горчичный соус, моцарелла, фирменный томатный соус",
    price: 789,
    image: bavarianImage,
  },
  {
    id: 4,
    name: "Креветки блю чиз",
    description: "Креветки, сыр блю чиз, моцарелла, фирменный соус альфредо",
    price: 649,
    image: blueCheeseImage,
  },
  {
    id: 5,
    name: "Карбонара",
    description:
      "Бекон, сыры чеддер и пармезан, моцарелла, томаты, красный лук, чеснок, фирменный соус альфредо, итальянские травы",
    price: 549,
    image: carbonaraImage,
  },
  {
    id: 6,
    name: "Сырная",
    description: "Моцарелла, сыры чеддер и пармезан, фирменный соус",
    price: 429,
    image: cheesyImage,
  },
  {
    id: 7,
    name: "Четыре сезона",
    description:
      "Увеличенная порция моцареллы, ветчина, пикантная пепперони, кубики брынзы, томаты, шампиньоны, итальянские травы, фирменный томатный соус",
    price: 449,
    image: fourSeasonImage,
  },
  {
    id: 8,
    name: "Жульен",
    description:
      "Цыпленок, шампиньоны, ароматный грибной соус, лук, сухой чеснок, моцарелла, смесь сыров чеддер и пармезан, фирменный соус альфредо",
    price: 499,
    image: julienImage,
  },
  {
    id: 9,
    name: "Четыре сыра",
    description:
      "Сыр блю чиз, сыры чеддер и пармезан, моцарелла, фирменный соус альфредо",
    price: 489,
    image: fourCheeseImage,
  },
  {
    id: 10,
    name: "Мясной микс",
    description:
      "Пряная говядина, баварские колбаски, пикантная пепперони, бекон, моцарелла и фирменный томатный соус",
    price: 489,
    image: meatMixImage,
  },
  {
    id: 11,
    name: "Песто",
    description:
      "Цыпленок, соус песто, кубики брынзы, томаты, моцарелла, фирменный соус альфредо",
    price: 499,
    image: pestoImage,
  },
  {
    id: 12,
    name: "Мясная",
    description:
      "Цыпленок, ветчина, пикантная пепперони, острые колбаски чоризо, моцарелла, фирменный томатный соус",
    price: 499,
    image: meatImage,
  },
];

// Асинхронный thunk для загрузки пицц
// export const fetchPizzas = createAsyncThunk("menu/fetchPizzas", async () => {
//   try {
//     const response = await fetch("http://localhost:3001/pizzas");
//     if (!response.ok) {
//       throw new Error("Не удалось загрузить пиццы");
//     }
//     const data = await response.json();
//     return data as Pizza[];
//   } catch (error) {
//     console.error("Ошибка при загрузке пицц:", error);
//     return mockPizzas;
//   }
// });

// const menuSlice = createSlice({
//   name: "menu",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPizzas.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchPizzas.fulfilled, (state, action) => {
//         state.loading = false;
//         state.pizzas = action.payload;
//       })
//       .addCase(fetchPizzas.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || "Ошибка загрузки пицц";
//         state.pizzas = mockPizzas;
//       });
//   },
// });

const initialState: MenuState = {
  pizzas: mockPizzas, // Используем mockPizzas сразу
  loading: false,
  error: null,
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {},
});

export default menuSlice.reducer;
