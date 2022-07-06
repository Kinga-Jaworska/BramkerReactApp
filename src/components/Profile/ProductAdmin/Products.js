import { useContext } from "react";
import DataContext from "../../../context/data-context";
import ProductItem from "./ProductItem";

const Products = (props) => {

  const dataCtx = useContext(DataContext)

  return props.products.map((product) => {
    
    return (
      <ProductItem
        product={product}
        onDelete={props.onDelete}
        accessoryCat={props.accessoryCat}
        mainCat={props.mainCat}
        selectedAccesory={props.selectedAccesory}
        price_brutto={dataCtx.convertToBurtto(product.price_netto)}
        automatsCat={props.automatsCat}      
        onEditProduct={props.onEditProduct}  
      ></ProductItem>
    );
  });
};

export default Products;
