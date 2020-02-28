import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const getColors = () => {
    axiosWithAuth()
      .get("colors")
      .then((res) => {
        // console.log(res);
        setColorList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getColors();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
