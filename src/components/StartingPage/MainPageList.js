import { useContext, useEffect, useState } from "react";
import Products from "../Profile/ProductAdmin/Products";
import AddProduct from "../Profile/ProductAdmin/AddProduct";
import VerticalMenu from "../Layout/VerticalMenu";
import styles from "./MainPageList.module.css";
import Button from "../GUI/Button";
import DataContext, { DataContextProvider } from "../../context/data-context";
import AuthContext from "../../context/auth-context";

const MainPageList = (props) => {
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext)

  const automats = dataCtx.automats;
  const accessory = dataCtx.accessory;
  const automatsCat = dataCtx.automatsCat;

  const isAnim = dataCtx.isAnim;
  const isError = dataCtx.isError;
  const isLoadingAccesory = dataCtx.isAnim;
  const isErrorAccesory = dataCtx.isErrorAccesory;

  const [addFormVisibility, setAddFormVisibility] = useState(false);
  const [products, setDisplayProducts] = useState([]);
  const [selectedAccesory, setSelectedCat] = useState("");
  const [selectedMainCat, setSelectedMainCat] = useState("automaty");
  const [loadedAccess, setLoadedAccess] = useState();

  //console.log('ROLE '+authCtx.role)

  const automatsOpen = (e) => {
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

  useEffect(() => {
    setDisplayProducts(dataCtx.automats);
  }, [dataCtx.automats]);

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

  //PREPARE CONTENT:
  let content = <p>No data</p>;

  if (dataCtx.automats.length > 0) {
    content = (
      <Products
        onDelete={onDeleteHandle}
        products={products}
        mainCat={selectedMainCat}
        selectedAccesory={selectedAccesory}
        accessoryCat={accessory}
        automatsCat={automatsCat}
        onEditProduct={handleEditProduct}
      />
    );
  } else if (isError || isErrorAccesory) {
    content = (
      <div>
        <p className={styles["error"]}>{isError}</p>
        {/* <button onClick={fetchAutomats}>Try again</button> */}
      </div>
    );
  } else if (isAnim || isLoadingAccesory) {
    content = (
      <div className={styles["spinner"]}>
        <div className={styles["loading-spinner"]}>
          <img
            width="100px"
            src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/loading-icon.png"
          />
        </div>
      </div>
    );
  }

  //VIEW:
  return (
    <div className={styles["wrap-container"]}>
      <div className={styles["container"]}>
        <div className={styles["col-left"]}>
          <VerticalMenu
            accessory={accessory}
            accessoryOpen={accessoryOpen}
            automatsOpen={automatsOpen}
          />
        </div>
      </div>

      <div className={styles["container-2"]}>
        <div className={styles["container-row"]}>
          {!isAnim && (
            <div>
              <Button className="block-btn" onClick={displayAddForm}>
                Add
              </Button>
            </div>
          )}
          <div className={styles["col-up"]}>
            {automatsCat && addFormVisibility && (
              <AddProduct
                accessory={accessory}
                onAddProduct={handleAddProduct}
                onDisplay={displayAddForm}
                automatsCat={automatsCat}
              />
            )}
          </div>
          <div className={styles["col-main-1"]}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default MainPageList;
