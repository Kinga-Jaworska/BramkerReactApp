import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ProductsAdmin from "../Profile/ProductAdmin/ProductsAdmin";
import VerticalMenu from "../Layout/VerticalMenu";
import styles from "./MainPageList.module.css";
import DataContext from "../../context/data-context";
import { useHistory, useParams } from "react-router-dom";
import { baseURL } from "../../firebase.config";
import useHttp from "../hooks/use-http";
import ProductsUser from "../Profile/ProductUser/ProductsUser";
import AuthContext from "../../context/auth-context";

const MainPageList = (props) => {
  const {
    isAnim: isLoadingAccesory,
    error: isErrorAccesory,
    sendRequest: fetchAccessory,
  } = useHttp();
  const {
    isAnim: isLoading,
    error: isError,
    sendRequest: fetchAutomats,
  } = useHttp();
  const dataCtx = useContext(DataContext);
  const authCtx = useContext(AuthContext);
  const history = useHistory();
  const params = useParams();
  const [mainCat, setMainCat] = useState("");
  const [isAnim, setIsAnim] = useState(false);
  const [displayProducts, setDisplayProducts] = useState([]);

  const getSelectedAccessory = async (selectedSubCat) => {
    const url = `${baseURL}/akcesoria/${selectedSubCat}.json`;

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      console.log(response.statusText);
    } else {
      const data = await response.json();
      const loadedAccessory = [];

      for (const key in data) {
        loadedAccessory.push({
          id: key,
          cat: "akcesoria",
          // isSwitchM: data[key].wylacznikiMechaniczne === "TAK" ? true : false,
          // isSwitchK: data[key].wylacznikiKrancowe === "TAK" ? true : false,
          isDiscount: data[key].podlegaRabatowi === "TAK" ? true : false,
          img: data[key].img,
          name_product: data[key].nazwa,
          price_netto: data[key].cenaNetto,
          subCat: selectedSubCat,
        });
      }
      setDisplayProducts(loadedAccessory);
    }
  };

  const getSelectedAutomats = (selectedSubCat) => {
    getAutomats();
    // console.log("param");
    // console.log(selectedSubCat.toLowerCase());

    // const filteredAutomats = displayProducts.filter((item) => {
    //   //console.log(item.subCat.toLowerCase());
    //   return item.subCat.toLowerCase() === selectedSubCat.toLowerCase();
    // });
    // console.log(filteredAutomats);
    // setDisplayProducts(filteredAutomats);
  };

  const getAutomats = () => {
    const transformAutomats = (automatsObj) => {
      const loadedAutomats = [];

      for (const key in automatsObj) {
        loadedAutomats.push({
          id: key,
          cat: "automaty",
          isSwitchM:
            automatsObj[key].wylacznikiMechaniczne === "TAK" ? true : false,
          isSwitchK:
            automatsObj[key].wylacznikiKrancowe === "TAK" ? true : false,
          // isSwitch:
          //   automatsObj[key].wylacznikiMechaniczne === "TAK" ? true : false,
          isDiscount: automatsObj[key].podlegaRabatowi === "TAK" ? true : false,
          img: automatsObj[key].img,
          name_product: automatsObj[key].nazwa,
          price_netto: automatsObj[key].cenaNetto,
          subCat: automatsObj[key].dzial,
        });
      }

      let filteredAutomats = loadedAutomats;
      if (params.cat) {
        filteredAutomats = loadedAutomats.filter((item) => {
          return item.subCat.toLowerCase() === params.cat.toLowerCase();
        });
      }

      setDisplayProducts(filteredAutomats);
    };
    fetchAutomats({ url: `${baseURL}/automaty.json` }, transformAutomats);
  };

  const openProductsList = (selectedCat) => {
    setIsAnim(true);
    if (mainCat === "akcesoria" && selectedCat) {
      console.log("ACCESSORY");
      getSelectedAccessory(selectedCat);
    }
    if (mainCat === "automaty" && selectedCat) {
      console.log("AUTOMATS");
      getSelectedAutomats(selectedCat);
    } else {
      getAutomats();
    }
    setIsAnim(false);
  };

  const automatsCatOpen = (cat) => {
    setMainCat("automaty");
    history.push(`/automats/${cat}`);
  };

  const automatsOpen = (e) => {
    setMainCat("automaty");
    history.push(`/`);
  };

  const accessoryOpen = (cat) => {
    setMainCat("akcesoria");
    history.push(`/accessory/${cat}`);
  };

  const onDeleteHandle = (id, mainCat) => {
    const newProducts = displayProducts.filter((product) => {
      return product.id !== id;
    });
    // console.log(newProducts.length);
    // console.log(displayProducts.length);
    setDisplayProducts(newProducts);
  };
  const onEditHandle = (editedProduct) => {
    const editedArray = displayProducts.map((product) => {
      if (product.id === editedProduct["id"]) return editedProduct;
      else return product;
    });
    // console.log(newProducts.length);
    // console.log(displayProducts.length);
    setDisplayProducts(editedArray);
  };

  useEffect(() => {
    openProductsList(params.cat);
  }, [params.cat]);

  useEffect(() => {
    openProductsList(params.cat);
  }, []);

  //PREPARE CONTENT:
  let content = <p>No data</p>;
  if (isAnim) {
    content = (
      <div className={styles["spinner"]}>
        <div className={styles["loading-spinner"]}>
          <img
            width="100px"
            alt="Spinner loading"
            src="https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat-one-color/128/loading-icon.png"
          />
        </div>
      </div>
    );
  } else if (displayProducts.length > 0) {
    if (props.role === "a") {
      content = (
        <ProductsAdmin
          onDelete={onDeleteHandle}
          onEditProduct={onEditHandle}
          products={displayProducts}
          mainCat={mainCat}
          role={props.isUser}
        />
      );
    } else if (props.role === "u") {
      content = (
        <ProductsUser
          products={displayProducts}
          mainCat={mainCat}
          role={props.isUser}
        />
      );
    }
  }

  //VIEW:
  return (
    <div className={styles["wrap-container"]}>
      <div className={styles["container"]}>
        <div className={styles["col-left"]}>
          <VerticalMenu
            automats={dataCtx.menuAutomats}
            accessory={dataCtx.menuAccessory} // dataCtx
            accessoryOpen={accessoryOpen}
            automatsOpen={automatsOpen}
            automatsCatOpen={automatsCatOpen}
          />
        </div>
      </div>

      <div className={styles["container-2"]}>
        <div className={styles["container-row"]}>
          {!isAnim && (
            <div className={styles["top-container"]}>
              <div className={styles["searcher"]}>
                <img src="https://img.icons8.com/color/344/search--v1.png" />
                {/* <input
                  type="text"
                  onChange={searcherHandle}
                  value={searchKey}
                  ref={searchKeyRef}
                /> */}
              </div>
            </div>
          )}
          <div className={styles["col-main-1"]}>
            {content}
            {/* {console.log(props.role)}
            {!isAnim && props.role === "u" && (
              <ProductsUser
                products={displayProducts}
                mainCat={mainCat}
                role={props.isUser}
              />
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageList;
