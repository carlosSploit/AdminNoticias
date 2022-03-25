import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./Assets/css/correct_andd.css"
import { Layout, Menu, Breadcrumb } from "antd";
import Admin from "./components/Admin/Admin";
import Login from "./components/Admin/login";
import React, { useState, useEffect } from "react";
import { token } from "./config/constans";
import {
  getplains,
  addplains,
  updateplains,
  deleteplains,
  readplains,
} from "./config/plans";
import { gettoken } from "./config/mithelworks";
import { getpointsanalitic, getaperturtime } from "./config/votacions";

function App() {
  const [tokenexist, gettokenexit] = useState()

  useEffect(() => {
    (async () => {
      gettokenexit(localStorage.getItem(token))
      console.log(tokenexist)
      //console.log(token);
    })();
  }, [tokenexist]);

  const checketkey = () =>{
    gettokenexit(localStorage.getItem(token));
  }

  return (tokenexist)?<Admin/>:<Login callback = {checketkey}/>;
}

export default App;
