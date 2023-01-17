import React, { useState } from "react";

import { InputUtils, SeparatorSymbols } from "./input";
import { KeyCodeEnum } from "./types";
import { Container, StyledMoneyInput, ErrorText } from "./styles";

interface Props {
  setInputNumber: (input: number) => void;
  maxDecimals?: number;
  separatorSymbols?: SeparatorSymbols;
  error?: { enabled?: boolean; message?: string };
}

const MoneyInput = ({
  setInputNumber,
  maxDecimals,
  separatorSymbols = { decimalSeparator: ",", integerSeparator: "." },
  error = { enabled: false, message: "" }
}: Props) => {
  const [inputString, setInputString] = useState("");

  const isMaxDecimal = (decimals?: string[], maxDecimals?: number) =>
    decimals &&
    maxDecimals &&
    decimals.length > 1 &&
    decimals[1].length > maxDecimals;

  const onInputChange = (value: string) => {
    const stringValue = InputUtils.formatMoneyInput(value, separatorSymbols);
    const numberValue = InputUtils.formatMoneyInputToNumber(
      stringValue,
      separatorSymbols
    );
    const decimals = value.split(separatorSymbols.decimalSeparator);

    if (isMaxDecimal(decimals, maxDecimals)) return;

    setInputString(stringValue);
    setInputNumber(numberValue);
  };

  const handleNumpadDecimal = (
    event: React.KeyboardEvent<HTMLInputElement>,
    inputMoney: string
  ) => {
    if (event.nativeEvent.code === KeyCodeEnum.NUMPAD_DECIMAL) {
      if (inputMoney.includes(separatorSymbols.decimalSeparator)) return;
      const newMoney = `${inputMoney}${separatorSymbols.decimalSeparator}`;

      setInputString(newMoney);
      setInputNumber(
        InputUtils.formatMoneyInputToNumber(newMoney, separatorSymbols)
      );
    }
  };

  return (
    <Container>
      <StyledMoneyInput
        inputMode="decimal"
        type="string"
        value={inputString}
        onKeyUp={(e) => handleNumpadDecimal(e, inputString)}
        onKeyDown={InputUtils.preventInvalidNumberInput}
        onChange={(e) => onInputChange(e.target.value)}
        $error={error?.enabled}
      />
      {error?.enabled && <ErrorText>{error?.message}</ErrorText>}
    </Container>
  );
};

export { MoneyInput };
