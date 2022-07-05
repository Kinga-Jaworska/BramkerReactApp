import React, { useCallback, useEffect, useState } from "react";
import useHttp from "../components/hooks/use-http";

const DataContext = React.createContext({
  automats: [],
  accessory: [],
  automatsCat: [],
  isAnim: true,
  isError: false,
  isErrorAccesory: false,
  convertToBurtto: () => {},
  getAutomats: () => {},
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
  const [automats, setAutomats] = useState([]);
  const [accessory, setAccessory] = useState([]);
  const [automatsCat, setAutomatsCat] = useState([]);


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
      //console.log(loadedAutomats)
      setAutomats(loadedAutomats);
      // setDisplayProducts(loadedAutomats);
    };
    //automatsHandler()

    fetchAutomats({ url: `${FIREBASE_URL}/automaty.json` }, transformAutomats);

    //console.log('context: '+automats)
  }, [fetchAutomats]);

  useEffect(() => {
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

    fetchAccessory(
      { url: `${FIREBASE_URL}/akcesoria.json` },
      transformAccessory
    );

    //console.log('context: '+automats)
  }, [fetchAccessory]);


  useEffect(()=>
  {
      const transformSubList = (subItemObj) => {
      const loadedSubCat = [];
      for (const key in subItemObj) {
        loadedSubCat.push({
          name: subItemObj[key],
        });
      }
      setAutomatsCat(loadedSubCat);
    };

    fetchAccessory(
      { url: `${FIREBASE_URL}/automatsCat.json` },
      transformSubList
    ); 
  },[fetchAccessory])

  const automatsHandler = () => {
    //fetchAutomats({ url: `${FIREBASE_URL}/automaty.json` }, transformAutomats);
  };

  const accessoryHandler = () => {};

  const convertBruttoHandle = (cenaNetto) =>
  {
    const brutto = (
      Math.floor(
        (+cenaNetto * 0.23 + +cenaNetto) * 10
      ) / 10
    ).toFixed(2);

    return brutto;
  }

  const contextValue = {
    automats: automats,
    accessory: accessory,
    automatsCat: automatsCat,
    isAnim: isAnim,
    isError: isError,
    isErrorAccesory: isErrorAccesory,
    convertToBurtto: convertBruttoHandle,
    getAutomats: automatsHandler,
    getAccessory: accessoryHandler,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
