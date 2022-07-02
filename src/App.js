import Products from "./components/Products/Products";
import AddProduct from "./components/ProductAdmin/AddProduct";
import "./App.css";
import Navbar from "./components/GUI/Navbar";
import { useEffect, useState, useCallback } from "react";
import NavLink from "./components/GUI/NavLink";
import VerticalMenu from "./components/GUI/VerticalMenu";
import useHttp from "./components/hooks/use-http";
import ProductForm from "./components/ProductAdmin/ProductForm";

const App = () => {
  const [addFormVisibility, setAddFormVisibility] = useState(false);
  const [products, setDisplayProducts] = useState([]);
  const [automats, setAutomats] = useState([]);
  const [accessory, setAccessory] = useState([]);
  // const [isAnim, setAnim] = useState(false);
  // const [error, setError] = useState(null);
  //let animation = isAnim ? "fadeIn" : "";
  const [selectedCat, setSelectedCat] = useState("Automaty");
  const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

  const {
    isAnim,
    error: isError,
    sendRequest: fetchAutomats,
  } = useHttp();

  const {
    isAnim: isLoadingAccesory,
    error: isErrorAccesory,
    sendRequest: fetchAccessory,
  } = useHttp();

  useEffect(() => {
    const transformAutomats = (automatsObj) => {
      //console.log("automObj " + automatsObj);
      const loadedAutomats = [];
      for (const key in automatsObj) {
        //console.log('key: '+key+' '+automatsObj[key])
        loadedAutomats.push({
          id: key,
          cat: "automaty",
          isSwitch: automatsObj[key].wylacznikiMechaniczne === 'TAK' ? true : false,
          isDiscount: automatsObj[key].podlegaRabatowi === 'TAK' ? true : false,                
          img: automatsObj[key].img,
          name_product: automatsObj[key].nazwa,
          price_netto: automatsObj[key].cenaNetto,
          subCat: automatsObj[key].dzial
          // price_brutto: automatsObj[key].cenaBrutto,
        });
      }
      setAutomats(loadedAutomats)
      setDisplayProducts(loadedAutomats);
    };

    const transformAccessory = (accessoryObj) => {
      const loadedAccessory = [];
      for (const key in accessoryObj) {
        loadedAccessory.push({
          cat: key,
          data: accessoryObj[key],
        });
      }
      setAccessory(loadedAccessory);
    };
    fetchAutomats({ url: `${FIREBASE_URL}/automaty.json`}, transformAutomats);
    fetchAccessory({ url: `${FIREBASE_URL}/akcesoria.json`}, transformAccessory
    );
  }, [fetchAutomats, fetchAccessory]);

  const automatsOpen = (e) => {
    //fetchAutomats();
    //setProducts
    setSelectedCat("automaty");
    setDisplayProducts(automats)
  };

  const accessoryOpen = (e) => {
    const cat = e.target.textContent;
    // console.log(cat);
    let loadedAccessory = [];
    setSelectedCat(cat);

    const findAccessory = accessory.find((element) => element.cat === cat).data;
    for (const key in findAccessory) {
      loadedAccessory.push({
        id: key,
        name_product: findAccessory[key].nazwa,
        price_netto: findAccessory[key].cenaNetto,
        img: findAccessory[key].img,
        isDiscount: findAccessory[key].podlegaRabatowi,
        subCat: cat
        // price_brutto: findAccessory[key].cenaBrutto,
      });
    }
    setDisplayProducts(loadedAccessory);
  };
  
  const handleAddProduct = (addedProduct) =>
  {
    //console.log(addedProduct)
    //console.log(addedProduct.name_product)
    setDisplayProducts((prevProduct) => prevProduct.concat(addedProduct));
  }

  const displayAddForm = () => {
    setAddFormVisibility(!addFormVisibility);
  };

  let content = <p>No data</p>;

  if (products.length > 0) {
    
  console.log('len: '+products.length)

    content = (
      <Products
        products={products}
        info={selectedCat}
      />
    );
  } else if (isError) {
    content = <div><p className="error">{isError}</p><button onClick={fetchAutomats}>Try again</button></div>
  } else if (isAnim) {
    content = <p className="error">Anim ...</p>; //Spinner, progress bar
  }

  return (
    <>
      <Navbar>
        {/* <img height="40" src={logo} /> */}
        <NavLink onClick={displayAddForm}>Add</NavLink>
        <NavLink>Zmień % Brutto</NavLink>
      </Navbar>
      <main>
        {isError && <p>ERROR</p>}
        <VerticalMenu
          accessory={accessory}
          accessoryOpen={accessoryOpen}
          automatsOpen={automatsOpen}
        />
        <div className="admin-add-product">
          {addFormVisibility && (
          <AddProduct accessory={accessory} onAddProduct={handleAddProduct} onDisplay={displayAddForm}/>
          )}
        </div>
        {content}
        {/* {devices.length > 0 && (
          <Products products={devices} className={animation} />
        )*/}
      </main>
      <footer></footer>
    </>
  );
};

export default App;
