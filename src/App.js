import Products from "./components/Products/Products";
import AddProduct from "./components/ProductAdmin/AddProduct";
import "./App.css";
import Navbar from "./components/GUI/Navbar";
import { useEffect, useState, useCallback } from "react";
import NavLink from "./components/GUI/NavLink";
import VerticalMenu from "./components/GUI/VerticalMenu";
import useHttp from "./components/hooks/use-http";

const App = () => {
  const [addFormVisibility, setAddFormVisibility] = useState(false);
  const [products, setProducts] = useState([]);
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
          img: automatsObj[key].img,
          name: automatsObj[key].nazwa,
          price_netto: automatsObj[key].cenaNetto,
          price_brutto: automatsObj[key].cenaBrutto,
        });
      }
      setProducts(loadedAutomats);
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
    fetchAutomats();
    setSelectedCat("Automaty");
  };

  const productAddHandler = (product) =>
  {
    setProducts((prevProduct) => prevProduct.concat(product)) /// ? it works ??
  }

  const accessoryOpen = (e) => {
    const cat = e.target.textContent;
    console.log(cat);
    let loadedAccessory = [];
    setSelectedCat(cat);

    const findAccessory = accessory.find((element) => element.cat === cat).data;
    for (const key in findAccessory) {
      loadedAccessory.push({
        id: key,
        name: findAccessory[key].nazwa,
        price_netto: findAccessory[key].cenaNetto,
        img: findAccessory[key].img,
        // price_brutto: findAccessory[key].cenaBrutto,
      });
    }
    setProducts(loadedAccessory);
  };
  
  useEffect(() =>{
    console.log()
  },[])

  const openAddForm = () => {
    setAddFormVisibility(!addFormVisibility);
  };

  let content = <p>No data</p>;

  if (products.length > 0) {
    content = (
      <Products
        products={products}
        // className={animation}
        info={selectedCat}
        // onFetch={fetchAutomats}
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
        <NavLink onClick={openAddForm}>Add</NavLink>
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
            <AddProduct
              onAdd={productAddHandler}
              // selectedCat={selectedCat}
              subListAccesory={accessory}
              onOpen={openAddForm}
              subListAutomats={accessory}
            />
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
