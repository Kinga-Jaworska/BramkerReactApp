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
        onDelete={props.onDelete}
        accessoryCat={props.accessoryCat}
        mainCat={props.mainCat}
        selectedAccesory={props.selectedAccesory}
        price_brutto={toBrutto(product.price_netto)}
        automatsCat={props.automatsCat}      
        onEditProduct={props.onEditProduct}  
      ></ProductItem>
    );
  });
};

export default Products;
