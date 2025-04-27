import { Box } from "@mui/material";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface MainLayoutProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  toggleTheme,
  mode,
  children,
}) => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Header toggleTheme={toggleTheme} mode={mode} />
    <Box component="main" sx={{ flex: 1, p: 2, pt: 10 }}>
      {children}
    </Box>
    <Footer />
  </Box>
);

export default MainLayout;
