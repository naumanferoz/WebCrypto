import React from "react";
import { makeStyles } from "@mui/styles";
import { Container, Typography } from "@mui/material";
import banner2 from "../Images/banner2.jpg";
import Carousel from "./Carousel";
const useStyles = makeStyles({
  bannerText: {
    height: 400,
    display: "flex !important",
    justifyContent: "space-around !important",
    flexDirection: "column",
    alignItems: "center !important",
    paddingTop: 22,
  },
  tagLine: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
});

const Banner = () => {
  const classes = useStyles();
  return (
    <div style={{ backgroundImage: `url(${banner2})` }}>
      <Container className={classes.bannerText}>
        <div className={classes.tagLine}>
          <Typography
            style={{
              fontWeight: "bold",
              fontStyle: "Montserrat",
              marginBottom: 15,
            }}
            variant="h2"
          >
            Crypto Raven
          </Typography>
          <Typography
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
            }}
            variant="subtitle2"
          >
            Get All the Lastest Information Regarding The Trending Crypto
            Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
