import React, { useState, useEffect } from "react";

import "./styles.css";
import { MoneyInput } from "./MoneyInput";

export default function App() {
  const [inputNumber, setInputNumber] = useState(0);

  useEffect(() => {
    console.log("Final integer number:", inputNumber);
  }, [inputNumber]);

  return (
    <div className="App" style={{ padding: 5 }}>
      <MoneyInput maxDecimals={2} setInputNumber={setInputNumber} />
    </div>
  );
}
