import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import MainLayout from "./layouts/MainLayout";
import AppRoutes from "./routes/AppRoutes";
import { persistor, store } from "./store";
import { getTheme } from "./theme/theme";

function App() {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout toggleTheme={toggleTheme} mode={mode}>
            <AppRoutes />
          </MainLayout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
