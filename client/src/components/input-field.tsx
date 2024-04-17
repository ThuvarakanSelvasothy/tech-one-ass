import React, { useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
interface PlainTextFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  min: number;
  max: number;
}

export default function InputField({
  placeholder,
  value,
  onChange,
  min = 0,
  max = 500000,
}: PlainTextFieldProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: string) => {
    if (event) {
      setInputValue(event);
      onChange && onChange(event);
    }
  };

  return (
    <>
      <div
        className={`w-full flex gap-2 items-center text-2xl font-semibold text-app-gray-900`}
      >
        <NumericFormat
          required
          max={max}
          min={min}
          placeholder={placeholder}
          allowLeadingZeros
          thousandSeparator=","
          decimalScale={2}
          prefix="$"
          value={value ? value : inputValue}
          onValueChange={(value) =>
            handleInputChange(value ? value.value : "0")
          }
          className=" w-full px-3 py-1 border border-gray-300 rounded-md shadow outline-gray-400 "
        />
      </div>
    </>
  );
}
