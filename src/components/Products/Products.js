import ProductItem from "./ProductItem";

const Products = (props) => {
  // const [anim, setAnim] = useState(false)

  function toBrutto(netto) {
    const brutto = (Math.floor((+netto * 0.23 + +netto) * 10) / 10).toFixed(2);
    return brutto;
  }
  let content = "";

  if (props.products.length > 0) {
    content = props.products.map((product) => {
      return (
        <ProductItem
          info={props.info}
          id={product.id}
          key={product.id}
          name={product.name}
          img={product.img}
          price_netto={product.price_netto}
          price_brutto={toBrutto(product.price_netto)}
        ></ProductItem>
      );
    });
  }
  if (props.error) {
    content = <button onClick={props.onFetch}>Fetch again</button>;
  }
  if (props.isAnim) {
    content = "Loading...";
  }

  return props.products.map((product) => {
    return (
      <ProductItem
        info={props.info}
        id={product.id}
        key={product.id}
        name={product.name}
        img={product.img}
        price_netto={product.price_netto}
        price_brutto={toBrutto(product.price_netto)}
      ></ProductItem>
    );
  });
};

export default Products;
