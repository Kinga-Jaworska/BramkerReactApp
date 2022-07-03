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
  const [products, setDisplayProducts] = useState([]);
  const [automats, setAutomats] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [automatsCat, setAutomatsCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState("automaty");
  const [selectedMainCat, setSelectedMainCat] = useState("");
  const [loadedAccess, setLoadedAccess] = useState();
  const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";

  const { isAnim, error: isError, sendRequest: fetchAutomats } = useHttp();

  const {
    isAnim: isLoadingAccesory,
    error: isErrorAccesory,
    sendRequest: fetchAccessory,
  } = useHttp();

  useEffect(() => {
    const transformAutomats = (automatsObj) => {
      const loadedAutomats = [];
      for (const key in automatsObj) {
        loadedAutomats.push({
          id: key,
          cat: "automaty",
          isSwitch:
            automatsObj[key].wylacznikiMechaniczne === "TAK" ? true : false,
          isDiscount: automatsObj[key].podlegaRabatowi === "TAK" ? true : false,
          img: automatsObj[key].img,
          name_product: automatsObj[key].nazwa,
          price_netto: automatsObj[key].cenaNetto,
          subCat: automatsObj[key].dzial,
        });
      }
      setAutomats(loadedAutomats);
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

    const transformSubList = (subItemObj) => {
      const loadedSubCat = [];
      for (const key in subItemObj) {
        loadedSubCat.push({
          name: subItemObj[key],
        });
      }
      setAutomatsCat(loadedSubCat);
    };

    fetchAutomats({ url: `${FIREBASE_URL}/automaty.json` }, transformAutomats);
    fetchAccessory(
      { url: `${FIREBASE_URL}/akcesoria.json` },
      transformAccessory
    );
    fetchAccessory(
      { url: `${FIREBASE_URL}/automatsCat.json` },
      transformSubList
    );
  }, [fetchAutomats, fetchAccessory, setAutomatsCat]);

  const automatsOpen = (e) => {
    //fetchAutomats();
    //setProducts
    setSelectedCat("automaty");
    setSelectedMainCat("automaty");
    setDisplayProducts(automats);
  };

  const accessoryOpen = (cat) => {
    let loadedAccessory = [];
    setSelectedCat(cat);
    setSelectedMainCat("akcesoria");
    const findAccessory = accessory.find((element) => element.cat === cat).data;
    for (const key in findAccessory) {
      loadedAccessory.push({
        id: key,
        name_product: findAccessory[key].nazwa,
        price_netto: findAccessory[key].cenaNetto,
        img: findAccessory[key].img,
        isDiscount: findAccessory[key].podlegaRabatowi === "TAK" ? true : false,
        subCat: cat,
        cat: "akcesoria",
      });
    }
    setDisplayProducts(loadedAccessory);
    setLoadedAccess(loadedAccessory);
  };

  const handleAddProduct = (addedProduct) => {
    setDisplayProducts((prevProduct) => prevProduct.concat(addedProduct));
  };

  const displayAddForm = () => {
    setAddFormVisibility(!addFormVisibility);
  };

  const onDeleteHandle = (id, mainCat, subCat) => {
    if (mainCat === "automaty") {
      const newArray = automats.filter(function (el) {
        return el.id != id;
      });
      setDisplayProducts(newArray);
    } else if (mainCat === "akcesoria") {
      const newArray = loadedAccess.filter(function (el) {
        return el.id != id;
      });
      setDisplayProducts(newArray);
    }
  };

  const handleEditProduct = (editedProduct, selectedType) => {
    //console.log(editedProduct);

    if (selectedType === "automaty") {
      const editedAutomats = automats.map((automat) => {
        if (editedProduct.id === automat.id) {
          automat = editedProduct;
        }
        return automat;
      });
      setDisplayProducts(editedAutomats);
    } else {
      const editedAccesory = loadedAccess.map((access) => {
        if (editedProduct.id === access.id) {
          access = editedProduct;
        }
        return access;
      });
      setDisplayProducts(editedAccesory);
    }
  };

  let content = <p>No data</p>;

  if (products.length > 0) {
    content = (
      <Products
        onDelete={onDeleteHandle}
        products={products}
        mainCat={selectedMainCat}
        selectedAccesory={selectedCat}
        accessoryCat={accessory}
        automatsCat={automatsCat}
        onEditProduct={handleEditProduct}
      />
    );
  } else if (isError || isErrorAccesory) {
    content = (
      <div>
        <p className="error">{isError}</p>
        <button onClick={fetchAutomats}>Try again</button>
      </div>
    );
  } else if (isAnim || isLoadingAccesory) {
    content = (
      <div className="spinner">
        <div className="loading-spinner">
          <img
            width="100px"
            src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/loading-icon.png"
          />
        </div>
      </div>
    );
    //content = <div className="spinner">Anim ...<img  width="100px" src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/loading-icon.png"/></div>; //Spinner, progress bar
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
        <div className="container">
          <div className="col-left">
          <VerticalMenu
              accessory={accessory}
              accessoryOpen={accessoryOpen}
              automatsOpen={automatsOpen}
            />
          </div>
          </div>
          <div className="container-2">
          <div className="container-row">
          <div className="col-up">
          {addFormVisibility && (
            <AddProduct
              accessory={accessory}
              onAddProduct={handleAddProduct}
              onDisplay={displayAddForm}
              automatsCat={automatsCat}
            />
          )}
          </div>
          <div className="col-main-1">         
            {content}             
          </div>
        </div>
        </div>
      

        {/* <div className="row-container">
          <div className="col-container">
            <VerticalMenu
              accessory={accessory}
              accessoryOpen={accessoryOpen}
              automatsOpen={automatsOpen}
            />
          </div>
          </div> */}
          {/* <div className="row-full-container">
        <div className="admin-add-product">  
        <div className="col-container">
          {addFormVisibility && (
            <AddProduct
              accessory={accessory}
              onAddProduct={handleAddProduct}
              onDisplay={displayAddForm}
              automatsCat={automatsCat}
            />
          )}
          </div>
</div>
        </div>
        
          <div className="col-container">
          {content}
          </div>
         */}
        
      </main>
      <footer></footer>
    </>
  );
};

export default App;
