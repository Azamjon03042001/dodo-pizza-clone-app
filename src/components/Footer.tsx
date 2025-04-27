import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "background.paper", py: 4, mt: "auto" }}
    >
      <Container>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Dodo Pizza Clone. All rights reserved.
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          mt={1}
        >
          Created by Hojibaev Azam
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
