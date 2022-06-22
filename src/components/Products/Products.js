// import { render } from "@testing-library/react";
import "./Products.css";
import Card from "../GUI/Card";
import ProductItem from './ProductItem'

const Expenses = (props) => {
  return (
    // <Card className="products">
      props.products.map((product) => {
        return (
          <ProductItem
            name={product.name}
            price_netto={product.price_netto}
            price_brutto={product.price_brutto}
          ></ProductItem>
        );
      })
    // </Card>
  );
};

export default Expenses;
