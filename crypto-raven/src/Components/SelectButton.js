import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selected: {
      cursor: "pointer",
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      backgroundColor: selected ? "gold" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
    },
  });

  const classes = useStyles();
  return (
    <span className={classes.selected} onClick={onClick} selected={selected}>
      {children}
    </span>
  );
};

export default SelectButton;
