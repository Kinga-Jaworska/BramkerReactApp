import { useContext } from "react";
import DataContext from "../../../context/data-context";
import ProductItem from "./ProductItem";

const ProductsAdmin = (props) => {
  const dataCtx = useContext(DataContext);

  return props.products.map((product, index) => {
    return (
      <div key={`${product.subCat}_${index}`}>
        <ProductItem
          product={product}
          onDelete={props.onDelete}
          accessoryCat={props.accessoryCat}
          mainCat={props.mainCat}
          price_brutto={dataCtx.convertToBurtto(product.price_netto)}
          automatsCat={props.automatsCat}
          onEditProduct={props.onEditProduct}
        ></ProductItem>
      </div>
    );
  });
};

export default ProductsAdmin;
