import { useContext } from "react";
import DataContext from "../../../context/data-context";
import { ProductClientItem } from "../ProductUser/ProductClientItem";
import ProductItem from "./ProductItem";

const ProductsAdmin = (props) => {
  const dataCtx = useContext(DataContext);

  return props.products.map((product, index) => {
    return (
      <ProductItem
        product={product}
        onDelete={props.onDelete}
        accessoryCat={props.accessoryCat}
        mainCat={props.mainCat}
        // selectedAccesory={props.selectedAccesory}
        price_brutto={dataCtx.convertToBurtto(product.price_netto)}
        automatsCat={props.automatsCat}
        onEditProduct={props.onEditProduct}
      ></ProductItem>
    );
  });
};

export default ProductsAdmin;
