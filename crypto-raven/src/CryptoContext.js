import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("EUR");
  const [symbol, setSymbol] = useState("€");

  useEffect(() => {
    if (currency === "USD") {
      setSymbol("$");
    } else if (currency === "EUR") setSymbol("€");
  }, [currency]);

  return (
    <AppContext.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </AppContext.Provider>
  );
};
export default CryptoContext;
