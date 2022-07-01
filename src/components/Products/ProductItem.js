import { useEffect, useState } from "react";
import Button from "../GUI/Button";
import "./ProductItem.css";

function ProductItem(props) {

  const editHandle = (e) =>
  {
    // console.log(e.target.value)
    // console.log(props.info)
    // let fetchStr = `https://reacttest-b7b01-default-rtdb.firebaseio.com/`

    // if(props.info === 'Automaty')
    // {
    //   fetchStr += `automaty/${e.target.value}.json`
    // }
    // else
    // {
    //   fetchStr += `akcesoria/${props.info}/${e.target.value}.json`      
    // }
   
    // console.log(fetchStr)

    // fetch(fetchStr,
    // {
    //   method: 'PATCH',
    //   // body: JSON.stringify(product),
    //   headers:{
    //     'Content-Type' : 'application/json'
    //   }
    // });
  }

  const deleteHandle = (e) =>
  {
    console.log(e.target.value)
    console.log(props.info)
    let fetchStr = `https://reacttest-b7b01-default-rtdb.firebaseio.com/`

    if(props.info === 'Automaty')
    {
      fetchStr += `automaty/${e.target.value}.json`
    }
    else
    {
      fetchStr += `akcesoria/${props.info}/${e.target.value}.json`      
    }
   
    console.log(fetchStr)

    fetch(fetchStr,
    {
      method: 'DELETE',
      // body: JSON.stringify(product),
      headers:{
        'Content-Type' : 'application/json'
      }
    });
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
              <div className="expense-price">{`Netto: ${props.price_netto} PLN`}</div>
              <div className="expense-price">{`Brutto: ${props.price_brutto} PLN`}</div>
            </div>
          </div>
        </div>
        <div className="expense-item-actions">
          <Button value={props.id} key={props.id} onClick={(e) => deleteHandle(e)}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
