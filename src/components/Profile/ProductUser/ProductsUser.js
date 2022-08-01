import { useContext, useEffect } from "react";
import CartContext from "../../../context/cart-context";
import DataContext from "../../../context/data-context";
import ProductItem from "../ProductAdmin/ProductItem";

const ProductsUser = (props) => {
  const dataCtx = useContext(DataContext);

  return props.products.map((product, index) => {
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
