import React, { useState, useEffect } from "react";
import {
  message,
  Button,
  Space,
  Modal,
  Image,
} from "antd";
import { readplains, updateplains } from "../../config/plans";
import { UploadOutlined } from "@ant-design/icons";
import { uploudImage } from "../../config/uploud_img";
import { getListcategori } from "../../config/categori";

export default function Model(props) {
  const { datos, callback } = props;

  // estados
  const [listCategori, setlistCategori] = useState([
    { id: 1, nombre: "Default" },
  ]);


  //const [datup, setdatup] = useState(datos);
  const [datup, setdatup] = useState({});
  const genericimage =
    "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png";
  const [imageload, setImageload] = useState(genericimage);
  const [fileimage, setfileimage] = useState(genericimage);
  const [statemodel, setmodel] = useState();
  const [valuebasic, setvaluebasic] = useState("");

   // stare de uso de variables
   const [nombre, setnombre] = useState(datup.nombre);
   const [descipccion, setdescipccion] = useState(datup.descripccion);
   const [id_categori, setid_categori] = useState(datup.id_categor);
   // manejador de errores
   const [listcheketerror, setlistcheketerror] = useState([false,false,false]);

  useEffect(() => {
    (async () => {
      loadplaintdata();
    })();
  }, []);

  const actualizar_index_categori = async () => {
    // extraer la categoria de inicio del combo box - select
    // se asa un filtro de la lista de categorias con la id esperada, retornado un objeto;
    var data = listCategori.filter((item) => {
      console.log(`${item.id} === ${datup.id_categor} - name : ${item.nombre}`);
      return item.id === datup.id_categor;
    });
    // si existe una categoria se emprime en el combo, sino se toma la prima categoria de la lista
    let datafil = Array.isArray(data) ? data[0] : data;
    console.log(datafil);
    setvaluebasic(
      datafil !== undefined ? datafil.nombre : listCategori[0].nombre
    );
  };

  const loadplaintdata = async () => {
    console.log("Entrando");
    // extrae la informacion de la apirees
    let token = await readplains(datos.id_negocio);
    setdatup(token);

    if (genericimage === imageload && token.url.indexOf("cloudinary") !== -1) {
      setImageload(token.url);
    }
    console.log(token);
    console.log(datup);
    // extraer la informacion de las categorias
    const response4 = await getListcategori();
    setlistCategori(response4);
    actualizar_index_categori();
  };

  const cancel_update = () => {
    //form.resetFields();
    loadplaintdata();
    setmodel(false);
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  // si es false, significa que no hay ningun error
  // si es verdadero, signigica que si hay
  const validate = (evt) => {
      let validecheck = false;
      if (!(evt.target.nameLocal.value !== "")||
          !(evt.target.description.value !== "")||
          !(evt.target.id_categ.value !== "")
      ){
        validecheck = true;
      }
      // recarga la lista de comprovantes de imputs
      setlistcheketerror([!(evt.target.nameLocal.value !== ""), !(evt.target.description.value !== ""), !(evt.target.id_categ.value !== "")]);
      return validecheck;
  }

  const onFinish = async (evt) => {

    // se realiza una validacion privia
    if (validate(evt)){
      onFinishFailed();
      return;
    }

    let url = "";

    if (fileimage["name"] !== undefined) {
      console.log("se intenta actualizar una imagen");
      const tuUrl = await uploudImage(fileimage);
      url = tuUrl.data[0].url;
    }

    // console.log(evt.id_categ);

    const data = {
      nombre: evt.target.nameLocal.value,
      descripccion: evt.target.description.value,
      url: url === "" ? datup.url : url,
      id_cat: parseInt(evt.target.id_categ.value),
    };
    // console.log("@@@@@@@@@@@@@@@@@ - datos de entrada");
    // console.log(data);
    // console.log("@@@@@@@@@@@@@@@@@ - datos init");
    // console.log(datup);
    // console.log(data);
    const token = await updateplains(datup.id_negocio, data);
    console.log(token);
    await loadplaintdata();
    message.success("Registro Exitoso!");
    callback();
  };

  /*
  {"messege":"imagen insertada correctamente",
  "data":[{
    "url":"http://res.cloudinary.com/noticiaslacana/image/upload/v1648146164/Images/y3rc4cpkas44g1kvrssh.jpg"
    ,"id":"Images/y3rc4cpkas44g1kvrssh"}
  ]}
  */

  const generarurl = async (evt) => {
    // console.log("Pruebas");
    let file = evt.target.files[0];
    setImageload(URL.createObjectURL(file));
    setfileimage(file);
  };

  return (
    <>
      <li>
        <div
          onClick={async () => {
            console.log("***********************************************");
            await loadplaintdata();
            console.log(valuebasic);
            console.log(datup);
            setmodel(true);
          }}
          class="dropdown-item"
          >{"Update"}</div>
      </li>
      {/* <Button
        type="primary"
        
      >
        Update
      </Button> */}
      <Modal
        title="Actualizar participante"
        centered
        visible={statemodel}
        onOk={() => {
          console.log(datos);
          document.getElementById(`updatedatapas${datos.id_negocio}`).click();
          // console.log(datup);
        }}
        onCancel={() => {
          cancel_update();
        }}
      >
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="uploudimage">
              <Image
                preview={false}
                style={{
                  borderRadius: "50%",
                }}
                width={200}
                src={imageload}
              />
              <div
                onClick={() => {
                  console.log(datos);
                  document.getElementById(`loadimage${datos.id_negocio}`).click();
                }}
                className="btnuploud"
              >
                <UploadOutlined
                  style={{
                    fontSize: "20px",
                    color: "white",
                  }}
                />
              </div>
            </div>
          </div>
          <br />
          {/* Formulario vanilla */}
          <form
            layout="vertical"
            onSubmit={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Inputtext
                label={"Nombre del local"}
                initvalue = {datup.nombre}
                checkvalue = {listcheketerror[0]}
                messegeerror = {"Error ingrese porfavor el nombre"}
                keyname = {"nameLocal"}
            />
            <Inputtext
                label={"Descripción"}
                initvalue = {datup.descripccion}
                checkvalue = {listcheketerror[1]}
                messegeerror = {"Error ingrese porfavor el Descripccion"}
                keyname = {"description"}
            />
            <Inputselect
              label={"Categoria"}
              initvalue = {datup.id_categor}
              checkvalue = {listcheketerror[2]}
              messegeerror = {"Error ingrese porfavor una categoria"}
              keyname = {"id_categ"}
              listitem={listCategori}
            />
            <br/>
            <input
                style={{
                  display: "none",
                }}
                name= "url"
                id={`loadimage${datos.id_negocio}`}
                type="file"
                onChange={generarurl}
                accept="image/png, .jpeg, .jpg, image/gif"
             />
             <button
                style={{
                  display: "none",
                }}
                id={`updatedatapas${datos.id_negocio}`}
                type="primary"
                htmlType="submit"
              >
                  Registrar
              </button>
          </form>
        </div>
      </Modal>
    </>
  );
}


const Inputtext = (props) =>{
  const {label,initvalue, checkvalue=false, messegeerror = "Error ingrese porfavor el nombre", keyname = "default"} = props;
  const [changetext, setchangetext] = useState(initvalue);
  // color en buen estado #bdbdbd color de error #ef5350

  return (
    <div>
      <div
      style={{
        paddingTop: "5px",
        paddingBottom: "5px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          paddingLeft: "2px",
          paddingRight: "15px",
          paddingBottom: "5px"
        }}
      >{label}</div>
      <div
        style={{
          padding: "5px",
          borderColor: `${(checkvalue)? "#ef5350" : "#bdbdbd"}`,
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "25px"
        }}
      >
        <input 
              style={{
                borderWidth: "0px",
                borderStyle: "solid",
                borderRadius: "25px",
                outline: "none",
                width: "100%"
              }}
              id={keyname} 
              name={keyname}
              type="text" 
              value={changetext}
              onChange={(e)=>{
              setchangetext(e.target.value);
            }}
        />
      </div>
      
    </div>
    {(checkvalue)?<div style={{color:"#ef5350"}}>{messegeerror}</div>:<></>}
    </div>
  );
}


const Inputselect = (props) =>{
  const {label,initvalue, checkvalue=false, messegeerror = "Error ingrese porfavor el nombre", keyname = "default", listitem = [{ id: 1, nombre: "Default" }] } = props;
  const [changetext, setchangetext] = useState(initvalue);
  // color en buen estado #bdbdbd color de error #ef5350

  return (
    <div>
      <div
      style={{
        paddingTop: "5px",
        paddingBottom: "5px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          paddingLeft: "2px",
          paddingRight: "15px",
          paddingBottom: "5px"
        }}
      >{label}</div>
      <div
        style={{
          padding: "5px",
          borderColor: `${(checkvalue)? "#ef5350" : "#bdbdbd"}`,
          borderWidth: "1px",
          borderStyle: "solid",
          borderRadius: "25px"
        }}
      >
        <select 
            style={{
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "25px",
              outline: "none",
              width: "100%"
            }}
            id={keyname}
            name={keyname} 
            type="text" 
            value={changetext}
            onChange={(e)=>{
              setchangetext(e.target.value);
            }}
          >
              {listitem.map((item) => {
                  return (
                    <option value={`${item.id}`}>
                      {item.nombre}
                    </option>
                  );
              })}
          </select>
      </div>
      
    </div>
    {(checkvalue)?<div style={{color:"#ef5350"}}>{messegeerror}</div>:<></>}
    </div>
  );
}
