import React, { useState, useEffect } from "react";
import { fetchRates } from "./api";

const Converter = () => {
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [amount, setAmount] = useState<number>(0);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  useEffect(() => {
    const getRates = async () => {
      try {
        const ratesData = await fetchRates();
        setRates(ratesData);
      } catch (error) {}
    };

    getRates();
  }, []);

  useEffect(() => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount(amount * rate);
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <div className="form-group">
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </div>
      <div className="form-group">
        <label htmlFor="fromCurrency">From:</label>
        <select
          id="fromCurrency"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="toCurrency">To:</label>
        <select
          id="toCurrency"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {Object.keys(rates).map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <h2>
        Converted Amount: {convertedAmount.toFixed(2)} {toCurrency}
      </h2>
    </div>
  );
};

export default Converter;
