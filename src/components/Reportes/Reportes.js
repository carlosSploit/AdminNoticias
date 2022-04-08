import React, { useState, useEffect } from "react";
import {
  Form,
  message,
  Typography,
  Button,
  Row,
  Col,
  Select,
} from "antd";
import {
  getaperturtime,
  getpointsanalitic,
  getaperturevotacion,
} from "../../config/votacions";
import { deleteplains } from "../../config/plans";
import ModelButton from "./model2";
import Bottonreload from "./recarga";
import { getlistapeture } from "../../config/votacions";
import { getListcategori } from "../../config/categori";
import "bootstrap/dist/js/bootstrap";
import Cargando from "../pagesalert/cargando/cargando"

export default function Registro() {
  const [categoristad, setcategoristad] = useState({
    id: 1,
    nombre: "Anonimato",
  });
  const [data, setData] = useState([]);
  const [datafilter, setDatafilter] = useState([]);
  const [aperture, setaperture] = useState({
    id_votaciones: 1,
    fecha: "2022-03-17 22:41:31",
  });
  const [listvotacion, setlistvotacion] = useState([
    { id_votaciones: 1, fecha: "2022-03-17T22:41:31.000Z" },
  ]);
  const [fechaApertura, setFechaApertura] = useState({
    dia: "00",
    anno: "0000",
    mes: "00",
  });
  const [listCategori, setlistCategori] = useState([
    { id: 1, nombre: "Default" },
  ]);

  useEffect(() => {
    list_aperute();
    list_categori();
    actualizarTabla();
    actualizartime();
  }, []);

  const key = "updatable";

  const { Title } = Typography;

  const list_categori = async () => {
    const response4 = await getListcategori();
    // refSelectCategory.current.value = "Default";
    setlistCategori(response4);
  };

  const actualizarTabla = async (id = 0) => {
    const token = await getpointsanalitic(id);
    // const data2 = token.map((item) => {
    //   return {
    //     key: item.id_negocio,
    //     id: item.id_negocio,
    //     name: item.nombre,
    //     category: item.descripccion,
    //     score: item.puntaje,
    //     porcent: item.promedio,
    //     id_categor: item.id_categor,
    //   };
    // });
    const data2 = token;
    setData(data2);
    setDatafilter(data2);
  };

  function format_date_mysql(fechaactual) {
    return `${fechaactual.substring(0, 4)}-${fechaactual.substring(
      4,
      6
    )}-${fechaactual.substring(6, 8)} ${fechaactual.substring(
      8,
      10
    )}:${fechaactual.substring(10, 12)}:00`;
  }

  const extract_fecha = (time) => {
    let fecha = format_date_mysql(time);
    return `${fecha}`;
  };

  const list_aperute = async () => {
    const token = await getlistapeture();
    let data2 = token.map((item) => {
      return {
        fecha: extract_fecha(item.fecha.toString()),
        id: item.id_votaciones,
      };
    });
    data2.reverse();
    if (token.length !== 0) {
      setlistvotacion(data2);
      // setaperture(initvalue);
    }
  };

  const actualizartime = async () => {
    const time = await getaperturtime();
    //console.log(time.code_time);
    const anno = time.code_time.slice(0, 4);
    const mes = time.code_time.slice(4, 6);
    const dia = time.code_time.slice(6, 8);

    const data = {
      anno: anno,
      mes: mes,
      dia: dia,
    };
    //console.log(data);
    setFechaApertura(data);
  };

  const columnhead = ["id","Nombre","Descripción","puntaje","promedio","Acciones"];

  // const columns = [
  //   { title: "id", dataIndex: "id_negocio", key: "id_negocio" },
  //   {
  //     title: "Nombre",
  //     dataIndex: "nombre",
  //     key: "nombre",
  //   },
  //   {
  //     title: "Descripción",
  //     dataIndex: "descripccion",
  //     key: "descripccion",
  //   },
  //   {
  //     title: "Puntaje",
  //     dataIndex: "puntaje",
  //     key: "puntaje",
  //     sorter: {
  //       compare: (a, b) => a.score - b.score,
  //       multiple: 1,
  //     },
  //     render: (text) => <a>{text}</a>,
  //   },
  //   {
  //     title: "Porcentaje",
  //     dataIndex: "promedio",
  //     key: "promedio",
  //     sorter: {
  //       compare: (a, b) => a.score - b.score,
  //       multiple: 1,
  //     },
  //   },
  //   {
  //     title: "Acciones",
  //     dataIndex: "action",
  //     key: "action",
  //     render: (text, record) => (
  //       <Space size="middle">
  //         <ModelButton datos={record} callback={actualizarTabla}></ModelButton>
  //         <Button
  //           onClick={() => {
  //             eliminarLugar(record);
  //           }}
  //         >
  //           Eliminar
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ];

  const Actions = [
    {
      name: "Eliminar",
      onchange: async (item)=>{
        await eliminarLugar(item.id_negocio);
      }
    }
  ]

  async function eliminarLugar(id) {
    //console.log(id);
    const token = await deleteplains(id);
    await actualizarTabla();
    console.log(token);
  }

  // function onChange(pagination, filters, sorter, extra) {
  //   console.log("params", pagination, filters, sorter, extra);
  // }

  const openMessage = async () => {
    console.log(datafilter[0]);
    message.loading({ content: "Cargando...", key, duration: 2 });
    setTimeout(() => {
      message.success({
        content: `Empresa GANADORA ${datafilter[0].name}`,
        key,
        duration: 17,
      });
    }, 1000);
  };

  //console.log(fechaApertura);
  const restablecer_convo = () => {
    setcategoristad({ id: 1, nombre: "Anonimato" });
    setaperture({ id_votaciones: 1, fecha: "2022-03-17 22:41:31" });
  };

  return (
    <Form>
      <Form.Item>
        <Row justify="space-between">
          <Col>
            <Title level={2}> Reportes de votaciones </Title>
          </Col>
          <Col>
            {/* Aperturar una nueva votacion */}
            <Bottonreload
              click={async () => {
                return await getaperturevotacion();
              }}
              callback={actualizartime}
            />
          </Col>
        </Row>
        <Row justify="space-between">
          <Col>
            <Row>
              <Select
                onChange={(value) => {
                  let dato = listvotacion.filter((item) => {
                    return item.id.toString() === value.toString();
                  });
                  let datos = Array.isArray(dato) ? dato[0] : dato;
                  setaperture(datos);
                }}
                value={
                  aperture.fecha === "2022-03-17 22:41:31"
                    ? "Selec Time"
                    : aperture.fecha
                }
                style={{ width: "200px" }}
              >
                {listvotacion.map((item) => {
                  return (
                    <Select.Option value={`${item.id}`}>
                      {item.fecha}
                    </Select.Option>
                  );
                })}
              </Select>
              <div style={{ width: "10px" }} />
              <Select
                onChange={(value) => {
                  let dato = listCategori.filter((item) => {
                    return item.id.toString() === value.toString();
                  });
                  let datos = Array.isArray(dato) ? dato[0] : dato;
                  setcategoristad(datos);
                }}
                value={
                  categoristad.nombre === "Anonimato"
                    ? "Selec Categori"
                    : categoristad.nombre
                }
                style={{ width: "200px" }}
              >
                {listCategori.map((item) => {
                  return (
                    <Select.Option value={`${item.id}`}>
                      {item.nombre}
                    </Select.Option>
                  );
                })}
              </Select>
            </Row>
          </Col>
          <Col>
            {/* Botton de busqueda por filtrar */}
            <Row>
              <Bottonreload
                label="Filtrar"
                click={async () => {
                  if (
                    aperture.fecha === "2022-03-17 22:41:31" &&
                    categoristad.nombre === "Anonimato"
                  ) {
                    message.error("Seleccioa algunos de los filtros porfavor!");
                    return;
                  }
                  // en caso que se aya seleccionado otro filtro, se comprueba si el id de apertura
                  // tiene un id de seleccion o un id de default, si esta en defaul hace la busqueda general
                  // pero si se selecciono, hace una peticion desde la id seleccionada
                  console.log(
                    aperture.fecha === "2022-03-17 22:41:31"
                      ? 0
                      : aperture.hasOwnProperty("id_votaciones")
                      ? aperture.id_votaciones
                      : aperture.id
                  );
                  await actualizarTabla(
                    aperture.fecha === "2022-03-17 22:41:31"
                      ? 0
                      : aperture.hasOwnProperty("id_votaciones")
                      ? aperture.id_votaciones
                      : aperture.id
                  );
                  // si se logro filtrar por categoria, se da el filtro respectivo
                  if (categoristad.nombre !== "Anonimato") {
                    let newdate = data.filter((item) => {
                      console.log(item);
                      return item.id_categor === categoristad.id;
                    });
                    setDatafilter(newdate);
                  }
                }}
                callback={() => {}}
              />
              <div style={{ width: "10px" }} />
              <Bottonreload
                label="Restablecer"
                click={async () => {
                  await actualizarTabla(0);
                  restablecer_convo();
                  console.log(categoristad);
                }}
                callback={() => {}}
              />
            </Row>
          </Col>
        </Row>
        <div style={{ height: "20px" }} />
        <Form.Item>
          {/* table - 1 */}
          {/* <Table
            dataSource={datafilter}
            columns={columns}
            onChange={onChange}
          /> */}
          {/* table - 1 */}
          <Tableboostrap
            heads = {columnhead}
            items = {datafilter}
            actions = {Actions}
            callbackaction = {actualizarTabla}
          />
          <Button onClick={openMessage}>
            {" "}
            Ganador de las votaciones a la fecha: {fechaApertura.dia}/
            {fechaApertura.mes}/{fechaApertura.anno}{" "}
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}

const Tableboostrap = (props) =>{

  const {heads,items, actions, callbackaction} = props;
  const [listfilteritem , setlistfilteritems] = useState([]);

  // useEffect((()=>{
  //     setlistfilteritems(items);
  // }),[listfilteritem]);

  return (
    <div class="table-responsive-md">
      <table class="table">
        <thead class="table-dark">
          <tr>
            {
              heads.map(item =>{
                return (<th scope="col">{item}</th>);
              })
            }
          </tr>
        </thead>
        <tbody>
          {
            (items.length === 0)?<Cargando/>:items.map(item => {
              return (
               <tr style={{
                 background: "white"
               }}>
                 <th scope="row">{item.id_negocio}</th>
                 <td>{item.nombre}</td>
                 <td>{item.descripccion}</td>
                 <td>{item.puntaje}</td>
                 <td>{item.promedio}</td>
                 <td>
                   <div class="dropdown">
                     <div class="btn btn-secondary dropdown-toggle" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                     </div>
 
                     <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                       {/* votones de accion no dependientes al padre */}
                       {
                         actions.map(itema=>{
                           return (<li>
                             <div
                               onClick={()=>{
                                 itema.onchange(item);
                               }}
                               class="dropdown-item"
                               >{itema.name}</div>
                           </li>)
                         })
                       }
                       {/* modal de ejecucion de la actualizacion */}
                       <ModelButton datos={item} callback={callbackaction}></ModelButton>
                     </ul>
                   </div>
                 </td>
               </tr>
              );
             })
          }
        </tbody>
      </table>
    </div>
    
  );
}
