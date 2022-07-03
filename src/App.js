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
  const [automatsCat, setAutomatsCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState("Automaty");
  const [loadedAccess, setLoadedAccess] = useState()
  const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";
  //const [accessorySelected, setAccessorySelected] = useState()

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

    const transformSubList = (subItemObj) =>
    {
      const loadedSubCat = [];
      for (const key in subItemObj) {
        //console.log('catAutomats: '+subItemObj[key])
        loadedSubCat.push({
          name: subItemObj[key],
        });
      }
      setAutomatsCat(loadedSubCat);     
    }

    fetchAutomats({ url: `${FIREBASE_URL}/automaty.json`}, transformAutomats);
    fetchAccessory({ url: `${FIREBASE_URL}/akcesoria.json`}, transformAccessory);
    fetchAccessory({ url: `${FIREBASE_URL}/subList.json`}, transformSubList);
  }, [fetchAutomats, fetchAccessory, setAutomatsCat]);

  const automatsOpen = (e) => {
    //fetchAutomats();
    //setProducts
    setSelectedCat("automaty");
    setDisplayProducts(automats)
  };

  const accessoryOpen = (cat) => {
    //const cat = e.target.textContent;
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
        isDiscount: findAccessory[key].podlegaRabatowi === 'TAK' ? true : false,
        subCat: cat,
        cat: 'akcesoria'
      });
    }
    setDisplayProducts(loadedAccessory);
    setLoadedAccess(loadedAccessory)
  };
  
  const handleAddProduct = (addedProduct) =>
  {
    setDisplayProducts((prevProduct) => prevProduct.concat(addedProduct));
  }

  const displayAddForm = () => {
    setAddFormVisibility(!addFormVisibility);
  };

  const handleEditProduct = (editedProduct, selectedType) =>
  {
    console.log(editedProduct)   

    if(selectedType==='automaty')
    {
      const editedAutomats = automats.map(automat => {
        // if this task has the same ID as the edited task
          if (editedProduct.id === automat.id) {
        
            automat = editedProduct
            //return {...automat, editedProduct}            
          }
          return automat;          
        });
        // console.log('edited: ' +editedAutomats[editedAutomats.indexOf(editedAutomats.find(el => el.id === editedProduct.id))].name_product)
        setDisplayProducts(editedAutomats)
    }  
    else
    {
      const editedAccesory = loadedAccess.map(access => {
          if (editedProduct.id === access.id) {        
            access = editedProduct       
          }
          return access;          
        });
        setDisplayProducts(editedAccesory)
    }

  }

  let content = <p>No data</p>;

  if (products.length > 0) {
    
  //console.log('len: '+products.length)

  console.log('Product render..')

    content = (
      <Products
        products={products}
        info={selectedCat}
        accessoryCat={accessory}
        automatsCat={automatsCat}
        onEditProduct={handleEditProduct}
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
          <AddProduct accessory={accessory} onAddProduct={handleAddProduct} onDisplay={displayAddForm} automatsCat={automatsCat}/>
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
