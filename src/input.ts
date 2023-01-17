import React from "react";

export interface SeparatorSymbols {
  integerSeparator: string;
  decimalSeparator: string;
}

const INVALID_CHARS = ["-", "+", "e", "E"];
const DEFAULT_NUMBER_DECIMAL_SYMBOL = ".";

const preventSpace = (e: React.KeyboardEvent) => {
  if (e.key === " ") {
    e.preventDefault();
  }
};

const preventInvalidNumberInput = (e: React.KeyboardEvent) => {
  if (INVALID_CHARS.includes(e.key)) {
    e.preventDefault();
  }
};

const formatMoneyInput = (
  value: string,
  { integerSeparator, decimalSeparator }: SeparatorSymbols
) => {
  const formattedValues = value
    // Remove all digit grouping so we can form new groups
    .replaceAll(integerSeparator, "")
    // Remove anything that is not a digit or an allowed symbol
    .replace(/[^\d,.]/, "")
    // Split the number in integer and decimal parts
    .split(decimalSeparator);

  // Group the integer part in groups of 3
  const integerPart = formattedValues[0].replace(
    /\d(?=(?:\d{3})+$)/g,
    `$&${integerSeparator}`
  );
  const decimalPart = formattedValues[1];

  if (decimalPart) return `${integerPart}${decimalSeparator}${decimalPart}`;
  if (value.includes(decimalSeparator))
    return `${integerPart}${decimalSeparator}`;
  return integerPart;
};

const formatMoneyInputToNumber = (
  value: string,
  { integerSeparator, decimalSeparator }: SeparatorSymbols
) => {
  const numberWithoutDigitGrouping = value.replaceAll(integerSeparator, "");
  const finalFormat =
    decimalSeparator === DEFAULT_NUMBER_DECIMAL_SYMBOL
      ? numberWithoutDigitGrouping
      : numberWithoutDigitGrouping.replace(decimalSeparator, integerSeparator);

  return Number(finalFormat);
};

export const InputUtils = {
  preventSpace,
  preventInvalidNumberInput,
  formatMoneyInput,
  formatMoneyInputToNumber
};
