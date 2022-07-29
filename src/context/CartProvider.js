import { useContext, useEffect, useReducer, useState } from "react";
import { baseURL } from "../firebase.config";
import AuthContext from "./auth-context";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmountNetto: 0,
  totalAmountBrutto: 0,
  totalAmountDiscB: 0,
  totalAmountDiscN: 0,
  bruttoVal: +localStorage.getItem("bruttoVal") || 23,
};

const convertToBrutto = (cenaNetto) => {
  const brutto = (
    Math.floor(
      (+cenaNetto * (+defaultCartState.bruttoVal / 100) + +cenaNetto) * 10
    ) / 10
  ).toFixed(2);

  return brutto;
};

const setDiscountSum = (updatedItems, discVal) => {
  let discountSumN = 0;
  let discountSumB = 0;
  let notDiscountSumN = 0;
  let notDiscountSumB = 0;

  updatedItems.forEach((item) => {
    if (item.isDiscount) {
      discountSumN = item.price_netto * item.quantity + discountSumN;
      discountSumB =
        convertToBrutto(item.price_netto) * item.quantity + discountSumB;
    } else {
      notDiscountSumN = item.price_netto * item.quantity + notDiscountSumN;
      notDiscountSumB =
        convertToBrutto(item.price_netto) * item.quantity + notDiscountSumB;
    }
  });

  const totalAmountDiscN =
    discountSumN * ((100 - discVal) / 100) + notDiscountSumN;
  const totalAmountDiscB =
    discountSumB * ((100 - discVal) / 100) + notDiscountSumB;

  return {
    totalAmountDiscN,
    totalAmountDiscB,
  };
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

    const discount = setDiscountSum(updatedItems, action.discVal);

    console.log("ADDED items: ");
    console.log(updatedItems);

    return {
      items: updatedItems,
      totalAmountNetto: updatedTotalAmountNetto,
      totalAmountBrutto: updatedTotalAmountBrutto,
      totalAmountDiscB: discount.totalAmountDiscB,
      totalAmountDiscN: discount.totalAmountDiscN,
    };
  }

  if (action.type === "DELETE") {
    const index = action.id;
    const existingItem = state.items[index];

    const updatedTotalAmountNetto =
      state.totalAmountNetto -
      +existingItem.price_netto * existingItem.quantity;
    const updatedTotalAmountBrutto =
      state.totalAmountBrutto -
      convertToBrutto(existingItem.price_netto) * existingItem.quantity;

    const updatedItems = state.items.filter((item) => {
      if (item !== existingItem) return item;
    });

    const discount = setDiscountSum(updatedItems, action.discVal);

    return {
      items: updatedItems,
      totalAmountNetto: updatedTotalAmountNetto,
      totalAmountBrutto: updatedTotalAmountBrutto,
      totalAmountDiscB: discount.totalAmountDiscB,
      totalAmountDiscN: discount.totalAmountDiscN,
    };
  }
  if (action.type === "CLEAR_CART") {
    return defaultCartState;
  }
};

const CartProvider = (props) => {
  const [discVal, setDiscVal] = useState(0);
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  useEffect(() => {
    getDiscountVal();
  }, []); // localStorage.getItem("userID")

  const getDiscountVal = async () => {
    const userID = localStorage.getItem("userID");
    const url = `${baseURL}/users/${userID}.json`;

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(response.statusText);
    } else {
      const data = await response.json();
      if (data) {
        // console.log(data);
        // console.log(+data.rabat);
        setDiscVal(+data.rabat);
      }
    }
  };

  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item, discVal: discVal });
  };
  const removeItemCartHandler = (id) => {
    dispatchCartAction({
      type: "DELETE",
      id: id,
      discVal: discVal,
    });
  };
  const handleClearReducer = () => {
    dispatchCartAction({
      type: "CLEAR_CART",
    });
  };

  const handleGetDiscount = () => {
    getDiscountVal();
    return discVal;
  };

  const cartContext = {
    items: cartState.items,
    totalAmountNetto: cartState.totalAmountNetto,
    totalAmountBrutto: cartState.totalAmountBrutto,
    totalAmountDiscB: cartState.totalAmountDiscB,
    totalAmountDiscN: cartState.totalAmountDiscN,
    discVal: discVal,
    getDiscount: handleGetDiscount,
    addItem: addItemCartHandler,
    removeItem: removeItemCartHandler,
    clearReducer: handleClearReducer,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
