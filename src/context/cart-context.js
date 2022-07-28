import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmountNetto: 0,
  totalAmountBrutto: 0,
  totalAmountDiscB: 0,
  totalAmountDiscN: 0,
  discVal: 0,
  getDiscount: () => {},
  addItem: (item) => {},
  removeItem: (id, subCat) => {},
});

export default CartContext;
