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
        accessoryCat={props.accessoryCat}
        info={props.info}
        price_brutto={toBrutto(product.price_netto)}
        automatsCat={props.automatsCat}      
        onEditProduct={props.onEditProduct}  
      ></ProductItem>
    );
  });
};

export default Products;
