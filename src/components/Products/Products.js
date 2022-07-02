import ProductItem from "../ProductAdmin/ProductItem";

const Products = (props) => {
  function toBrutto(netto) {
    const brutto = (Math.floor((+netto * 0.23 + +netto) * 10) / 10).toFixed(2);
    return brutto;
  }

  return props.products.map((product) => {
    return (
      <ProductItem
        product={product}
        info={props.info}
        price_brutto={toBrutto(product.price_netto)}
        subListCategory={props.subListCategory}
      ></ProductItem>
    );
  });
};

export default Products;
