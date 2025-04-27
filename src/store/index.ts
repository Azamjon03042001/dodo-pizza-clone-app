import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "../features/cart/cartSlice";
import menuReducer from "../features/menu/menuSlice";

// Конфигурация для redux-persist
const peristConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

// Комбинируем редьюсеры
const rootReducer = combineReducers({
  menu: menuReducer,
  cart: cartReducer,
});

// Создаём персистентный редьюсер
const persistedReducer = persistReducer(peristConfig, rootReducer);

// Создаём store с персистентным редьюсером
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Создаём persistor для использования в App
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
