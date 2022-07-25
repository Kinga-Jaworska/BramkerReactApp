import { useContext } from "react";
import DataContext from "../../../context/data-context";
import ProductItem from "../ProductAdmin/ProductItem";
import { ProductClientItem } from "../ProductUser/ProductClientItem";

const ProductsUser = (props) => {
  const dataCtx = useContext(DataContext);

  return props.products.map((product, index) => {
    return (
      <ProductItem
        product={product}
        accessoryCat={props.accessoryCat}
        mainCat={props.mainCat}
        price_brutto={dataCtx.convertToBurtto(product.price_netto)}
        automatsCat={props.automatsCat}
        isUser={true}
      ></ProductItem>
    );
  });
};

export default ProductsUser;
