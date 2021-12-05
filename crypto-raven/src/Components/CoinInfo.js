import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Chart as ChartJS } from "chart.js/auto";
import { AppContext } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { CircularProgress } from "@mui/material";
import { chartDays } from "../config/chartDays";
import SelectButton from "./SelectButton";
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    mode: "dark",
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 30,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

export default function CoinInfo({ coin }) {
  const classes = useStyles();
  const [historicalData, setHistoricalData] = useState();
  const [day, setDay] = useState(1);
  const { currency } = useContext(AppContext);

  const fetchData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, day, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchData();
  }, [day]);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {" "}
        {!historicalData ? (
          <CircularProgress
            size={250}
            thickness={1}
            style={{ color: "gold" }}
          />
        ) : (
          <>
            {" "}
            <Line
              data={{
                labels: historicalData.map((coin) => {
                  const date = new Date(coin[0]);
                  const time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return day === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: `Price ( Past ${day} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 20,
            width: "100%",
          }}
        >
          {chartDays.map((item) => (
            <SelectButton
              selected={item.value === day}
              key={item.value}
              onClick={() => setDay(item.value)}
            >
              {item.label}
            </SelectButton>
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
}
