import Products from "./components/Products/Products";
import AddProduct from "./components/ProductAdmin/AddProduct";
import "./App.css";
import Navbar from "./components/GUI/Navbar";
import { useEffect, useState, useCallback } from "react";
import NavLink from "./components/GUI/NavLink";
import VerticalMenu from "./components/GUI/VerticalMenu";
import bramker from "./assets/bramker.PNG";

const App = () => {
  const [addFormVisibility, setAddFormVisibility] = useState(false);
  const [devices, setDevices] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [isAnim, setAnim] = useState(false);
  const [error, setError] = useState(null);
  let animation = isAnim ? "fadeIn" : "";

  const accessoryOpen = (e) => {
    const cat = e.target.textContent;
    console.log(cat);
    let loadedAccessory = [];
    //console.log(accessory)

    setAnim(true);

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
    setDevices(loadedAccessory);
    setAnim(false);
  };

  const fetchAccessory = useCallback(async () => {
    setAnim(true);
    try {
      const response = await fetch(
        "https://reacttest-b7b01-default-rtdb.firebaseio.com/akcesoria.json"
      );
      if (!response.ok) {
        throw new Error("Somethingwent wrong :C");
      }
      const data = await response.json();
      let loadedAccessory = [];

      for (const key in data) {
        loadedAccessory.push({
          cat: key,
          data: data[key],
        });
      }
      setAccessory(loadedAccessory);
    } catch (error) {
      setError(error.message);
    }
    setAnim(false);
  }, []);

  const fetchDevices = useCallback(async () => {
    setAnim(true);
    try {
      const response = await fetch(
        "https://reacttest-b7b01-default-rtdb.firebaseio.com/autoaty.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong :C");
      }
      const data = await response.json();
      const loadedDevices = [];

      for (const key in data) {
        //console.log('key: '+key+' '+data[key])
        loadedDevices.push({
          id: key,
          img: data[key].img,
          name: data[key].nazwa,
          price_netto: data[key].cenaNetto,
          price_brutto: data[key].cenaBrutto,
        });
      }
      setDevices(loadedDevices);
    } catch (error) {
      setError(error.message);
    }
    setAnim(false);
  }, []);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  useEffect(() => {
    fetchAccessory();
  }, [fetchAccessory]);

  const openAddForm = () => {
    setAddFormVisibility(!addFormVisibility);
  };
  const addProduct = (product) => {

    let saveProduct = {
      cenaNetto: product.price_netto,
      img: product.img,
      nazwa: product.name,
      podlegaRabatowi: product.isDiscount,
    };
    let fetchStr = "";

    if (product.cat === "Automaty") {
      saveProduct.dzial = product.subCat;
      saveProduct.wylacznikiKrancowe = product.isSwitch;
      fetchStr = product.cat.toLowerCase();
    } else if (product.cat === "Akcesoria") {
      fetchStr = `${product.cat.toLowerCase()}/${product.subCat}`;
    }

    fetch(
      `https://reacttest-b7b01-default-rtdb.firebaseio.com/${fetchStr}.json`,
      {
        method: "POST",
        body: JSON.stringify(saveProduct),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // setDevices((prevList) => {
    //   return [product, ...prevList];
    // });
  };

  let content = <p>No data</p>;

  if (devices.length > 0) {
    content = <Products products={devices} className={animation} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isAnim) {
    content = <p>Anim ...</p>;
  }

  return (
    <>
      <Navbar>
        
          {/* <img height="40" src={logo} /> */}
          <NavLink onClick={openAddForm}>Add</NavLink>
          <NavLink>Zmień % Brutto</NavLink>
        
      </Navbar>
      <main>
        {error && <p>ERROR</p>}
        <VerticalMenu accessory={accessory} accessoryOpen={accessoryOpen} />
        <div className="admin-add-product">
          {addFormVisibility && (
            <AddProduct
              onAdd={addProduct}
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
