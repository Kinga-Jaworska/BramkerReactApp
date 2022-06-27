import { useEffect, useState } from "react";
import Button from "../GUI/Button";
import "./ProductItem.css";

function ProductItem(props) {
  // console.log('item '+props.className)
  // let itemClass = `${'expense-item'} ${props.className ? styles.fadeIn : ''}`
  // console.log('item class'+itemClass)

  // useEffect(()=>
  // {
  //   // console.log('anim ')
  //   // setAnim(true)

  //   // console.log('class '+itemClass)

  //   console.log('effect ')
  //   itemClass = `${'expense-item'} ${props.className ? styles.fadeIn : ''}`
  //   console.log('item class'+itemClass)

  // },[props.className])

  // // console.log(isAnim)

  const deleteHandle = (e) =>
  {
    console.log(e.target.value)

    // fetch(`https://reacttest-b7b01-default-rtdb.firebaseio.com/automaty/${e.target.value}.json`),
    // {
    //   method: 'DELETE',
    //   body: JSON.stringify(product),
    //   headers:{
    //     'Content-Type' : 'application/json'
    //   }
    // }

  }

  return (
    <div className={"expense-item"}>
      <div className="expense-item-desc">
        <div className="expense-item-name">{props.name}</div>

        <div className="expense-item-info">
          <div className="expense-item-img">
            <img src={props.img}></img>
          </div>

          <div className="expense-price-block">
            <div className="expense-item-price">
              {/* <p className="p-netto">Netto: </p> */}
              <div className="expense-price">{`Netto: ${props.price_netto} PLN`}</div>
              {/* <p className="p-brutto">Brutto: </p> */}
              <div className="expense-price">{`Brutto: ${props.price_brutto} PLN`}</div>
            </div>
          </div>
        </div>
        <div className="expense-item-actions">
          <Button onClick={(e) => deleteHandle(e)}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
