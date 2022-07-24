import { useContext } from "react";
import DataContext from "../../../context/data-context";
import { ProductClientItem } from "../ProductUser/ProductClientItem";
import ProductItem from "./ProductItem";

const Products = (props) => {
  const dataCtx = useContext(DataContext);

  console.log(props.isUser);

  return props.products.map((product, index) => {
    return !props.isUser ? (
      <ProductItem
        key={index}
        product={product}
        onDelete={props.onDelete}
        accessoryCat={props.accessoryCat}
        mainCat={props.mainCat}
        // selectedAccesory={props.selectedAccesory}
        price_brutto={dataCtx.convertToBurtto(product.price_netto)}
        automatsCat={props.automatsCat}
        onEditProduct={props.onEditProduct}
      ></ProductItem>
    ) : (
      <ProductClientItem
        product={product}
        accessoryCat={props.accessoryCat}
        mainCat={props.mainCat}
        price_brutto={dataCtx.convertToBurtto(product.price_netto)}
        automatsCat={props.automatsCat}
      ></ProductClientItem>
    );
  });
};

export default Products;
