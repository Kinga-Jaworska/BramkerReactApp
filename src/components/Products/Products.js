// import { render } from "@testing-library/react";
import Card from "../GUI/Card";
import ProductItem from "./ProductItem";
import { useEffect, useState } from "react";

const Products = (props) => {

  // const [anim, setAnim] = useState(false)

  function toBrutto(netto) {
    const brutto = (Math.floor((+netto * 0.23 + +netto) * 10) / 10).toFixed(2);
    return brutto;
  }
 
  
  useEffect(()=>{    
    console.log('effect ')
    console.log(props.className)   //setAnim(true)


    return(()=>
    {
      console.log('clean' +props.className)
    })

    // anim===true ? animFade : ''
  })

  return (
    
    props.products.map((product) => {
      return (
        <ProductItem
          key={product.id}
          name={product.name}
          img={product.img}
          price_netto={product.price_netto}
          price_brutto={toBrutto(product.price_netto)}
        ></ProductItem>
      );
    })
  );
};

export default Products;
