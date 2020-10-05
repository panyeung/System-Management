import React, { useState } from "react";
import { Form, Input, Select, Button } from "antd";
const { Option } = Select;

const PriceInput = ({ value = {}, onChange }) => {
  const [number, setNumber] = useState(0);

  const triggerChange = (changedValue) => {
    if (onChange) {
      onChange({
        number,
        ...value,
        ...changedValue,
      });
    }
  };

  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || 0, 10);

    if (Number.isNaN(number)) {
      return;
    }

    if (!("number" in value)) {
      setNumber(newNumber);
    }

    triggerChange({
      number: newNumber,
    });
  };

  return (
    <Input
      type="number"
      value={value.number || number}
      onChange={onNumberChange}
      addonBefore="$"
      placeholder="Enter Product Price"
    />
  );
};

export default PriceInput;
