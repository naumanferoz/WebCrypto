import React, { useContext } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../CryptoContext";

const useStyles = makeStyles({
  logo: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat !important",
    fontWeight: "bold !important",
    cursor: "pointer",
  },
});

const Header = () => {
  const classes = useStyles();
  const { currency, setCurrency } = useContext(AppContext);
  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              className={classes.logo}
            >
              Crypto Raven
            </Typography>

            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              style={{ height: 40, width: 100, marginLeft: 15 }}
              variant="outlined"
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"EUR"}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
