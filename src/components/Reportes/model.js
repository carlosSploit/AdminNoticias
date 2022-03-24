import React, { useState, useEffect } from 'react';
import { Form, Input, message, Button, Space,Modal,Image } from "antd";
import {readplains, updateplains} from '../../config/plans'
import { UploadOutlined } from '@ant-design/icons';
import {uploudImage} from "../../config/uploud_img"

export default function Model(props){
    const [form] = Form.useForm();
    const {datos} = props;

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
    const [statemodel, setmodel] = useState();

    useEffect(() => {
        (async () => {
          let token = await readplains(datos.id);
          if (genericimage === imageload && token.url.indexOf("cloudinary") !== -1) setImageload(token.url)
          setdatup(token)
          //setImageload(token.url)
        })();
    }, [datup]);

    const cancel_update = ()=>{
        form.resetFields();
        setmodel(false);
    }

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };

    const onFinish = async (evt) => {
        message.success("Registro Exitoso!");
        const data = {
          nombre: evt.nameLocal,
          descripccion: evt.description,
          url: imageload,
        };
        const token = await updateplains(datup.id_negocio,data);
        form.resetFields();
        console.log(token);
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
        console.log(file);
        const tuUrl = await uploudImage(file);
        setImageload(tuUrl.data[0].url);
    };

    return (
        <>
          <Button type="primary" onClick={() => {
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
                    <Input type="text" value={datos.category}></Input>
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
                    <Input id={`loadimage${datos.id}`} type="file" onChange={generarurl} />
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