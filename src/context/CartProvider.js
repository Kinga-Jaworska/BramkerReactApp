import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmountNetto: 0,
  totalAmountBrutto: 0,
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
    console.log(action.item);

    const updatedTotalAmountNetto =
      state.totalAmountNetto + +action.item.price_netto * action.item.quantity;
    const updatedTotalAmountBrutto =
      state.totalAmountBrutto +
      convertToBrutto(action.item.price_netto) * action.item.quantity;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmountNetto: updatedTotalAmountNetto,
      totalAmountBrutto: updatedTotalAmountBrutto,
    };
  }

  if (action.type === "DELETE") {
    console.log(action.id);
    // console.log('state: '+state.items[0])
    state.items.findIndex((item) => {
      console.log("item : " + item.id + " " + action.id);
      return item.id === action.id;
    });
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    console.log("find " + existingCartItemIndex);

    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmountNetto =
      state.totalAmountNetto -
      +existingItem.price_netto * existingItem.quantity;
    const updatedTotalAmountBrutto =
      state.totalAmountBrutto -
      convertToBrutto(existingItem.price_netto) * existingItem.quantity;

    let updatedItems;

    updatedItems = state.items.filter((item) => item.id !== action.id);
    console.log("UPDATED: ");
    console.log(updatedItems);

    // if (existingItem.quantity === 1) {
    //   updatedItems = state.items.filter((item) => item.id !== action.id);
    // } else {
    //   const updatedItem = {
    //     ...existingItem,
    //     quantity: existingItem.quantity - 1,
    //   };
    //   updatedItems = [...state.items];
    //   updatedItems[existingCartItemIndex] = updatedItem;
    // }

    return {
      items: updatedItems,
      totalAmountNetto: updatedTotalAmountNetto,
      totalAmountBrutto: updatedTotalAmountBrutto,
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
  const removeItemCartHandler = (id) => {
    dispatchCartAction({ type: "DELETE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmountNetto: cartState.totalAmountNetto,
    totalAmountBrutto: cartState.totalAmountBrutto,
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
