import { useState } from "react";

export const QuantityInput = (props) => {
  const [quantity, setQuantity] = useState(props.quantity || "");

  // VALIDATE

  const handleChange = (e) => {
    console.log(+e.target.value);
    // console.log(item);
    // const newObj = { ...item, quantity: +e.target.value };
    // cartCtx.addItem(newObj);
    // console.log("ITEMS: ");
    // console.log(cartCtx.items);
    setQuantity(quantity);
    props.onChange(+e.target.value);
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
