import "./App.css";
import { makeStyles } from "@mui/styles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Coin from "./Pages.js/Coin";
import Home from "./Pages.js/Home";

function App() {
  const useStyles = makeStyles({
    App: {
      backgroundColor: "#14161a",
      color: "white",

      minHeight: "100vh",
    },
  });
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/coins/:id" element={<Coin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
