import { useContext, useEffect, useRef, useState } from "react";
import ProductsAdmin from "../Profile/ProductAdmin/ProductsAdmin";
import VerticalMenu from "../Layout/VerticalMenu";
import styles from "./MainPageList.module.css";
import DataContext from "../../context/data-context";
import { useHistory, useLocation, useParams } from "react-router-dom";
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
  const location = useLocation();
  const [mainCat, setMainCat] = useState(location.pathname.split("/")[1] || "");
  const [isAnim, setIsAnim] = useState(false);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(params.cat || "");
  const [searchKey, setSearchKey] = useState("");
  const searchKeyRef = useRef();
  const selectRef = useRef();
  const [orderBy, setOrderBy] = useState(
    localStorage.getItem("orderBramker") || "priceAsc"
  );

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
          isDiscount: data[key].podlegaRabatowi === "TAK" ? true : false,
          img: data[key].img,
          name_product: data[key].nazwa,
          price_netto: data[key].cenaNetto,
          subCat: selectedSubCat,
        });
      }
      setDisplayProducts(loadedAccessory);
      setProducts(loadedAccessory);
      sortAndOrder(orderBy, loadedAccessory);
    }
  };

  const getSelectedAutomats = () => {
    getAutomats();
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
      setProducts(filteredAutomats);
      sortAndOrder(orderBy, filteredAutomats);
    };
    fetchAutomats({ url: `${baseURL}/automaty.json` }, transformAutomats);
  };

  const openProductsList = (selectedCat) => {
    setIsAnim(true);
    // console.log("MAIN " + mainCat);
    if (mainCat === "akcesoria" && selectedCat) {
      getSelectedAccessory(selectedCat);
    }
    if (mainCat === "automaty" && selectedCat) {
      getSelectedAutomats();
    } else {
      getAutomats();
    }
    setIsAnim(false);
  };

  const automatsCatOpen = (cat) => {
    setMainCat("automaty");
    history.push(`/automaty/${cat}`);
  };

  const automatsOpen = (e) => {
    setMainCat("automaty");
    history.push(`/`);
  };

  const accessoryOpen = (cat) => {
    setMainCat("akcesoria");
    history.push(`/akcesoria/${cat}`);
  };

  const onDeleteHandle = (id, mainCat) => {
    const newProducts = displayProducts.filter((product) => {
      return product.id !== id;
    });

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
    setSelectedMenu(params.cat);
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

  const handleOrderBy = (e) => {
    setOrderBy(e.target.value);
    localStorage.setItem("orderBramker", e.target.value);
  };

  const sortAndOrder = (orderByValue, listToOrder) => {
    if (orderByValue === "priceAsc") {
      const newSort = [...listToOrder].sort((a, b) => {
        return +a["price_netto"] - +b["price_netto"];
      });
      setDisplayProducts(newSort);
    } else if (orderByValue === "priceDsc") {
      const newSort = [...listToOrder]
        .sort((a, b) => {
          return +a["price_netto"] - +b["price_netto"];
        })
        .reverse();
      setDisplayProducts(newSort);
    }
  };

  useEffect(() => {
    sortAndOrder(orderBy, displayProducts);
  }, [orderBy]);

  const isContains = (value) => {
    return value["name_product"]
      .toLowerCase()
      .includes(searchKey.toLowerCase());
  };

  useEffect(() => {
    let filteredProducts = products.filter(isContains);
    setDisplayProducts(filteredProducts);
  }, [searchKey]);

  const searcherHandle = (e) => {
    setSearchKey(e.target.value);
  };

  //VIEW:
  return (
    <div className={styles["wrap-container"]}>
      <div className={styles["container"]}>
        <div className={styles["col-left"]}>
          <VerticalMenu
            automats={dataCtx.menuAutomats}
            accessory={dataCtx.menuAccessory}
            selectedMain={mainCat}
            selectedMenu={selectedMenu}
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
                <input
                  type="text"
                  onChange={searcherHandle}
                  defaultValue={searchKey}
                  ref={searchKeyRef}
                />
                <select
                  ref={selectRef}
                  onClick={handleOrderBy}
                  defaultValue={orderBy}
                >
                  <option value="priceAsc">Cena najniższa</option>
                  <option value="priceDsc">Cena najwyższa</option>
                </select>
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
