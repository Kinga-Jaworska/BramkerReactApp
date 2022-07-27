import { useState } from "react";

export const QuantityInput = (props) => {
  const [quantity, setQuantity] = useState(props.item["quantity"] || "");

  // VALIDATE

  const handleChange = (e) => {
    setQuantity(e.target.value);
    props.onChange(props.item, +e.target.value);
  };

  return (
    <input
      type="number"
      min="1"
      max="100"
      value={quantity}
      onChange={(e) => handleChange(e)}
    />
  );
};
