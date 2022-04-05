import React, { useState } from 'react';
import { Form, Input, message, Button, Space,Modal,Image,Select } from "antd";
import {readplains, updateplains} from '../../config/plans'
import { UploadOutlined } from '@ant-design/icons';
import {uploudImage} from "../../config/uploud_img"
import { getListcategori } from '../../config/categori';


export default function Model(props){
    const [form] = Form.useForm();
    const {datos,callback} = props;
    // estados
    const [listCategori,setlistCategori] = useState([{id:1,nombre: "Default"}]);
    const [datup , setdatup] = useState({
        id_negocio : 0,
        nombre: "",
        descripccion : "",
        puntaje: 0,
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        stado: 0
    })
    const genericimage = "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    const [imageload, setImageload] = useState(genericimage)
    const [fileimage, setfileimage] = useState(genericimage)
    const [statemodel, setmodel] = useState();
    const [valuebasic, setvaluebasic] = useState("");

    // useEffect(()=>{
    //     if(valuebasic){
    //         (actualizar_index_categori)();
    //     }
    // },[valuebasic]);

    const actualizar_index_categori = async () => {
        // extraer la categoria de inicio del combo box - select
        // se asa un filtro de la lista de categorias con la id esperada, retornado un objeto;
        var data = listCategori.filter(item =>{
            console.log(`${item.id} === ${datup.id_categor} - name : ${item.nombre}`);
            return item.id === datup.id_categor;
        });
        // si existe una categoria se emprime en el combo, sino se toma la prima categoria de la lista
        let datafil = (Array.isArray(data))?data[0]:data;
        console.log(datafil);
        setvaluebasic((datafil !== undefined)?datafil.nombre:listCategori[0].nombre);
    }

    const loadplaintdata = async () => {
        console.log("Entrando");
        // extrae la informacion de la apirees
        let token = await readplains(datos.id);
        if (genericimage === imageload && token.url.indexOf("cloudinary") !== -1) setImageload(token.url)
        setdatup(token);
        // extraer la informacion de las categorias
        const response4 = await getListcategori();
        setlistCategori(response4);
        actualizar_index_categori();
    }

    const cancel_update = ()=>{
        //form.resetFields();
        loadplaintdata();
        setmodel(false);
    }

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };

    const onFinish = async (evt) => {
        let url = "";

        if (fileimage["name"] !== undefined){
            console.log("se intenta actualizar una imagen")
            const tuUrl = await uploudImage(fileimage);
            url = tuUrl.data[0].url
        }

        const data = {
          nombre: evt.nameLocal,
          descripccion: evt.description,
          url: (url === "")? datup.url : url,
          id_cat: evt.id_categ
        };
        const token = await updateplains(datup.id_negocio,data);
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

    const generarurl = async (evt) =>  {
        // console.log("Pruebas");
        let file = evt.target.files[0];
        setImageload(URL.createObjectURL(file));
        setfileimage(file)
    };

    return (
        <>
          <Button type="primary" onClick={ async () => {
              await loadplaintdata();
              console.log(valuebasic);
              console.log(datup);
              setmodel(true);
          }}>
            Update
          </Button>
          <Modal
            title="Actualizar participante"
            centered
            visible={statemodel}
            onOk={() => {
                document.getElementById(`updatedatapas${datos.id}`).click()
            }}
            onCancel={() => {
                cancel_update();
            }}
          >
        <div>
            <div style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <div className='uploudimage'>
                <Image
                    preview= {false}
                    style={{
                        borderRadius: "50%"
                    }}
                    width={200}
                    src={imageload}
                />
                <div  onClick={()=>{
                        document.getElementById(`loadimage${datos.id}`).click()
                    }} className='btnuploud'><UploadOutlined style={{
                        fontSize: "20px",
                        color: 'white'
                    }} /></div>
                </div>
            </div>
            <br/>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    name="nameLocal"
                    label="Nombre del local"
                    initialValue={datup.nombre}
                    rules={[{ required: true, message: "Por favor, Ingrese un nombre!" }]}
                >
                    <Input type="text" ></Input>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Descripción"
                    initialValue={datup.descripccion}
                    rules={[
                    { required: true, message: "Por favor, Ingrese una descripción!" },
                    ]}
                >
                    <Input type="text" value={datup.category}></Input>
                </Form.Item>

                <Form.Item
                    name="id_categ"
                    label="Categoria"
                    initialValue={valuebasic}
                    rules={[
                        { required: true, message: "Por favor, Ingrese una Categoria!" },
                    ]}
                >
                    <Select
                    >
                        {listCategori.map(item =>{
                            return (<Select.Option value={`${item.id}`}>{item.nombre}</Select.Option>);
                        })}
                    </Select>
                </Form.Item>

                <Form.Item
                    style={
                        {
                            display: "none"
                        }
                    }
                    name="url"
                    label="URL"
                    rules={[{ required: false, message: "Por favor, Ingrese una URL!" }]}
                >
                    <Input id={`loadimage${datos.id}`} type="file" onChange={generarurl}  accept="image/png, .jpeg, .jpg, image/gif" />
                </Form.Item>

                <Form.Item>
                    <Space>
                    <Button
                        style={{
                            display: "none"
                        }} 
                        id={`updatedatapas${datos.id}`} 
                        type="primary" 
                        htmlType="submit">
                        
                        Registrar
                    </Button>
                    </Space>
                </Form.Item>
            </Form>
            </div>
          </Modal>
        </>
      );
}