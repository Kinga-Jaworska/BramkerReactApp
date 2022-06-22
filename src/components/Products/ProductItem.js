import "./ProductItem.css";

function ProductItem(props) {
  return (
    <div className={`expense-item`}>
      <div className="expense-item-desc">
        <div className="expense-item-name">{props.name}</div>

        <div className="expense-item-info">
        <div className="expense-item-img">
        <img src="http://www.bramker.pl/cennik/IRI.LAMP.W.jpg"></img>
        </div>
       
        <div className="expense-item-price">
          <p className="p-netto">Netto: </p>
          <div className="expense-price">{`${props.price_netto} PLN`}</div>
          <p className="p-brutto">Brutto: </p>
          <div className="expense-price">{`${props.price_brutto} PLN`}</div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
