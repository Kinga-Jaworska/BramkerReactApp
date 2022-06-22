import Products from "./components/Products/Products";
import AddProduct from "./components/ProductAdmin/AddProduct";
import "./App.css";
import Navbar from "./components/GUI/Navbar";
import { useState } from "react";
import NavLink from "./components/GUI/NavLink";


const INITIAL_list = [
  {
    name: "Napęd BENINCA 234.67",
    price_netto: 3456.67,
    price_brutto: 4567.78,
  },
  {
    name: "Napęd BENINCA 234.67",
    price_netto: 3456.67,
    price_brutto: 4567.78,
  },
  {
    name: "Napęd BENINCA 234.67",
    price_netto: 3456.67,
    price_brutto: 4567.78,
  },
  {
    name: "Napęd BENINCA 234.67",
    price_netto: 3456.67,
    price_brutto: 4567.78,
  },
];
const App = () => {

  const [addFormVisibility, setAddFormVisibility] = useState(false)
  const [devices, setDevices] = useState(INITIAL_list)
  
  const openAddForm = () =>
  {
    setAddFormVisibility(!addFormVisibility)
  }

  const addProduct = (product) =>
  {
    console.log(product)
    setDevices((prevList)=>
    {
      return [product,...prevList]
    })
  }

  return (
    <div>
        <Navbar>
          <NavLink onClick={openAddForm}>Add</NavLink>
        </Navbar>
      <main>
        <div className="admin-add-product">        
          {addFormVisibility && <AddProduct onAdd={addProduct} onOpen={openAddForm}/>}
        </div>
        <Products products={devices} />
      </main>
    </div>
  );
};

export default App;
