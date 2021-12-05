import { LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { AppContext } from "../CryptoContext";
import parse from "html-react-parser";
import CoinInfo from "../Components/CoinInfo";
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  sideBar: {
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },
  description: {
    width: "100%",
    padding: 15,
    textAlign: "justify",
    paddingBottom: 10,
  },
  lowerText: {
    fontFamily: "Montserrat",
    fontWeight: "bold",
  },
  marketData: {
    alignSelf: "start !important",
    padding: 15,
    paddingTop: 10,
    width: "100%",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      justifyContent: "space-around",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
    [theme.breakpoints.down("xs")]: {
      alignItems: "start",
    },
  },
}));

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coin = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = useContext(AppContext);

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(coin);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sideBar}>
        {" "}
        <img
          height="200"
          src={coin?.image.large}
          alt={coin.name}
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          style={{
            fontFamily: "Montserrat",
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          {coin.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {parse(`${coin?.description.en.split(". ")[0]}`)}.
        </Typography>
        <div className={classes.marketData}>
          <Typography variant="h5" className={classes.lowerText}>
            Rank: <span>{coin?.market_cap_rank}</span>
          </Typography>
          <Typography variant="h5" className={classes.lowerText}>
            Current Price:{" "}
            <span style={{ marginLeft: ".4rem" }}>
              {symbol}&nbsp;
              {coin?.market_data.current_price[currency.toLowerCase()]}
            </span>
          </Typography>
          <Typography variant="h5" className={classes.lowerText}>
            Market Cap:
            <span style={{ marginLeft: ".5rem" }}>
              {symbol} &nbsp;
              {coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)}{" "}
              M
            </span>
          </Typography>
        </div>
      </div>
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coin;
