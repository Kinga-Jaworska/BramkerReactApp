export const QuantityInput = (props) => {
  // TODO: VALIDATE
  const handleChange = (e) => {
    props.onChange(props.item, +e.target.value);
  };

  return (
    <input
      key={props.item.id}
      type="number"
      min="1"
      max="100"
      defaultValue={props.item["quantity"] || ""}
      onChange={(e) => handleChange(e)}
    />
  );
};
