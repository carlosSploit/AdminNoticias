import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import "./Assets/css/correct_andd.css"
import Admin from "./components/Admin/Admin";
import React, { useState, useEffect } from "react";
import {
  getplains,
  addplains,
  updateplains,
  deleteplains,
  readplains,
} from "./config/plans";
import { gettoken } from "./config/mithelworks";
import { getpointsanalitic, getaperturevote } from "./config/votacions";

function App() {
  // useEffect((async()=>{
  //   const token = gettoken();
  // })(),[])
  // useEffect(async () => {
  //   //const token = await getaperturevote();
  //   // ##################################### analitic a los participantes
  //   // const token = await getpointsanalitic()
  //   // ##################################### read a los participantes
  //   // const token = await readplains()
  //   // ##################################### listar a los participantes
  //   // const token = await getplains()
  //   // ##################################### insertar a un participante
  //   // const token = await addplains({
  //   //     "nombre": "hjshfkjdshfjksdhfksd",
  //   //     "descripccion": "fsdhfjksdhfjksdhf",
  //   //     "url": "dfhsdjhfkjsdhfksd"
  //   // });
  //   //######################################## actualizar al participante
  //   // const token = await updateplains(15,{
  //   //     "nombre": "Emprsa el mercadona",
  //   //     "descripccion": "Empresa de venta de verduras y productos",
  //   //     "url": "http://imagengenerica.com"
  //   // });
  //   //######################################## Eliminar al participante
  //   // const token = await deleteplains(15);
  //   //console.log(token);
  // });

  useEffect(() => {
    (async () => {
      const token = await gettoken();
      //console.log(token);
    })();
  }, []);

  return <Admin />;
}

export default App;
