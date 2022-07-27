import { useContext, useEffect } from "react";
import CartContext from "../../../context/cart-context";
import DataContext from "../../../context/data-context";
import ProductItem from "../ProductAdmin/ProductItem";

const ProductsUser = (props) => {
  const dataCtx = useContext(DataContext);
  // const cartCtx = useContext(CartContext);

  // const checkIsCart = (product) => {
  //   const cartID = cartCtx.items.findIndex((item) => {
  //     if (item.id === product["id"] && item.subCat === product["subCat"]) {
  //       // console.log("item ==== " + item);
  //       return item;
  //     }
  //   });

  //   if (cartID !== -1) {
  //     // EXIST
  //     return true;
  //   } else return false;
  // };

  return props.products.map((product, index) => {
    // // {
    // //   console.log(index);
    // // }
    // {
    //   var isOnCart = checkIsCart(product);
    //   if (isOnCart) console.log(isOnCart);
    // }
    return (
      <div key={`${product.subCat}_${index}`}>
        <ProductItem
          product={product}
          accessoryCat={props.accessoryCat}
          mainCat={props.mainCat}
          price_brutto={dataCtx.convertToBurtto(product.price_netto)}
          automatsCat={props.automatsCat}
          isUser={true}
        ></ProductItem>
      </div>
    );
  });
};

export default ProductsUser;
