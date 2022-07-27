import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ProductsAdmin from "../Profile/ProductAdmin/ProductsAdmin";
import VerticalMenu from "../Layout/VerticalMenu";
import styles from "./MainPageList.module.css";
import DataContext from "../../context/data-context";
import { useHistory, useParams } from "react-router-dom";
import { baseURL } from "../../firebase.config";
import useHttp from "../hooks/use-http";
import ProductsUser from "../Profile/ProductUser/ProductsUser";

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
  const history = useHistory();
  const params = useParams();
  const [mainCat, setMainCat] = useState("");
  const [isAnim, setIsAnim] = useState(false);
  const [displayProducts, setDisplayProducts] = useState([]);

  // console.log(props.role);

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
          isSwitch: data[key].wylacznikiMechaniczne === "TAK" ? true : false,
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

  const getAutomats = () => {
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
      //console.log(loadedAutomats)
      setDisplayProducts(loadedAutomats);
    };
    fetchAutomats({ url: `${baseURL}/automaty.json` }, transformAutomats);
  };

  useEffect(() => {
    openProductsList(params.cat);
  }, [params.cat]);

  const openProductsList = (selectedCat) => {
    setIsAnim(true);
    if (selectedCat) {
      getSelectedAccessory(selectedCat);
    } else {
      getAutomats();
    }
    setIsAnim(false);
  };

  const automatsOpen = (e) => {
    setMainCat("automaty");
    history.push(`/`);
  };

  const accessoryOpen = useCallback((cat) => {
    setMainCat("akcesoria");
    history.push(`/accessory/${cat}`);
  }, []);

  const onDeleteHandle = (id, mainCat) => {
    const newProducts = displayProducts.filter((product) => {
      return product.id !== id;
    });
    // console.log(newProducts.length);
    // console.log(displayProducts.length);
    setDisplayProducts(newProducts);
  };
  const onEditHandle = (editedProduct) => {
    console.log("Main");
    console.log(editedProduct);

    const editedArray = displayProducts.map((product) => {
      if (product.id === editedProduct["id"]) return editedProduct;
      else return product;
    });
    // console.log(newProducts.length);
    // console.log(displayProducts.length);
    setDisplayProducts(editedArray);
  };

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
    // console.log("isUser: " + props.role);
    if (props.role === "a") {
      // console.log("isUser: " + props.role);

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
      // console.log("isUser: " + props.role);
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
            // selectedCat={}
            accessory={dataCtx.menuAccessory} // dataCtx
            accessoryOpen={accessoryOpen}
            automatsOpen={automatsOpen}
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
          <div className={styles["col-main-1"]}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default MainPageList;
