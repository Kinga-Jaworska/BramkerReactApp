import React, { useEffect, useState } from "react";
import useHttp from "../components/hooks/use-http";

const DataContext = React.createContext({
  menuAutomats: [],
  menuAccessory: [],
  isAnim: true,
  isError: false,
  isErrorAccesory: false,
  bruttoVal: 23,
  setBruttoVal: () => {},
  convertToBurtto: () => {},
  getAccessory: () => {},
});

const FIREBASE_URL = "https://reacttest-b7b01-default-rtdb.firebaseio.com";
export const DataContextProvider = (props) => {
  const {
    isAnim: isLoadingAccesory,
    error: isErrorAccesory,
    sendRequest: fetchAccessory,
  } = useHttp();
  const { isAnim, error: isError, sendRequest: fetchAutomats } = useHttp();
  const [menuAccessory, setAccessoryMenu] = useState([]);
  const [menuAutomats, setAutomatsMenu] = useState([]);
  const [bruttoVal, setBruttoVal] = useState(
    localStorage.getItem("bruttoVal") ? localStorage.getItem("bruttoVal") : 23
    // add btn -> set brutto to global or up prices instead brutto
  );

  useEffect(() => {
    accessoryCatHandler();
  }, []);

  useEffect(() => {
    const transformSubList = (subItemObj) => {
      const loadedSubCat = [];
      for (const key in subItemObj) {
        loadedSubCat.push({
          name: subItemObj[key],
        });
      }
      setAutomatsMenu(loadedSubCat);
    };

    fetchAccessory(
      { url: `${FIREBASE_URL}/automatsCat.json` },
      transformSubList
    );
  }, [fetchAccessory]);

  const accessoryCatHandler = () => {
    const transformAccessory = (accessoryObj) => {
      const loadedAccessory = [];

      for (const key in accessoryObj) {
        loadedAccessory.push({
          cat: key,
        });
      }
      setAccessoryMenu(loadedAccessory);
    };

    fetchAccessory(
      { url: `${FIREBASE_URL}/akcesoria.json` },
      transformAccessory
    );
  };

  const convertBruttoHandle = (cenaNetto) => {
    const brutto = (
      Math.floor((+cenaNetto * (bruttoVal / 100) + +cenaNetto) * 10) / 10
    ).toFixed(2);

    return brutto;
  };
  const setBruttoValHandle = (settedVal) => {
    setBruttoVal(settedVal);
    localStorage.setItem("bruttoVal", settedVal);
  };

  const contextValue = {
    menuAccessory: menuAccessory,
    menuAutomats: menuAutomats,
    isAnim: isAnim,
    isError: isError,
    isErrorAccesory: isErrorAccesory,
    bruttoVal: bruttoVal,
    setBruttoVal: setBruttoValHandle,
    convertToBurtto: convertBruttoHandle,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
