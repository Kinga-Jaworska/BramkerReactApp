import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmountNetto: 0,
  totalAmountBrutto: 0,
  totalAmountDiscB: 0,
  totalAmountDiscN: 0,
  bruttoVal: localStorage.getItem("bruttoVal") || 23,
};

const convertToBrutto = (cenaNetto) => {
  const brutto = (
    Math.floor(
      (+cenaNetto * (+defaultCartState.bruttoVal / 100) + +cenaNetto) * 10
    ) / 10
  ).toFixed(2);

  return brutto;
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let quantity;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id && item.subCat === action.item.subCat
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const quantityDifference =
        action.item.quantity - existingCartItem.quantity;
      quantity = quantityDifference;

      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + quantityDifference,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      quantity = action.item.quantity;
      updatedItems = state.items.concat(action.item);
    }

    const updatedTotalAmountNetto =
      state.totalAmountNetto + +action.item.price_netto * quantity;

    const updatedTotalAmountBrutto =
      state.totalAmountBrutto +
      convertToBrutto(action.item.price_netto) * quantity;

    const discVal = 25;

    const totalAmountDiscB = state.totalAmountBruto * (100 - discVal / 100);
    const totalAmountDiscN = state.totalAmountNetto * (100 - discVal / 100);

    return {
      items: updatedItems,
      totalAmountNetto: updatedTotalAmountNetto,
      totalAmountBrutto: updatedTotalAmountBrutto,
      totalAmountDiscB: totalAmountDiscB,
      totalAmountDiscN: totalAmountDiscN,
    };
  }

  if (action.type === "DELETE") {
    // console.log("delete...");
    const index = state.items.findIndex((item) => {
      // console.log(item);
      // console.log(action);
      return item.id === action.id && item.subCat === action.subCat;
    });

    const existingItem = state.items[index];
    // console.log("existingItem: ");
    // console.log(existingItem);

    const updatedTotalAmountNetto =
      state.totalAmountNetto -
      +existingItem.price_netto * existingItem.quantity;
    const updatedTotalAmountBrutto =
      state.totalAmountBrutto -
      convertToBrutto(existingItem.price_netto) * existingItem.quantity;

    let updatedItems;
    // updatedItems = state.items.map((item) => {
    //   if (item !== existingItem) return item;
    // });
    // updatedItems = state.items.del(action.id);
    updatedItems = state.items.filter(
      (item) => item.id !== action.id && item.subCat !== action.subCat
    );

    const totalAmountDiscB = state.totalAmountBruto * (100 - discVal / 100);
    const totalAmountDiscN = state.totalAmountNetto * (100 - discVal / 100);

    // updatedItems = state.items.filter((_item, index) => index !== action.id);
    // console.log("updatedItems");
    // console.log(updatedItems);
    return {
      items: updatedItems,
      totalAmountNetto: updatedTotalAmountNetto,
      totalAmountBrutto: updatedTotalAmountBrutto,
      totalAmountDiscB: totalAmountDiscB,
      totalAmountDiscN: totalAmountDiscN,
    };
  }
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };
  const removeItemCartHandler = (id, subCat) => {
    dispatchCartAction({ type: "DELETE", id: id, subCat: subCat });
  };

  const cartContext = {
    items: cartState.items,
    totalAmountNetto: cartState.totalAmountNetto,
    totalAmountBrutto: cartState.totalAmountBrutto,
    totalAmountDiscB: cartState.totalAmountDiscB,
    totalAmountDiscN: cartState.totalAmountDiscN,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
