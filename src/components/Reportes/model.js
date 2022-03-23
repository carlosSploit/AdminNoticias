import React, { useState, useEffect } from 'react';
import { Form, Input, message, Button, Space,Modal,Image } from "antd";
import {readplains, updateplains} from '../../config/plans'
import { UploadOutlined } from '@ant-design/icons';

export default function Model(props){
    const [form] = Form.useForm();
    const {datos} = props;
    const [datup , setdatup] = useState({
        id_negocio : 0,
        nombre: "",
        descripccion : "",
        puntaje: 0,
        url: "http://usuario.com",
        stado: 0
    })
    const [imageload, setImageload] = useState("https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png")
    const [statemodel, setmodel] = useState();

    useEffect(() => {
        (async () => {
          const token = await readplains(datos.id);
          setdatup(token)
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
          url: "htttp://Generico.com/",
        };
    
        const token = await updateplains(datup.id_negocio,data);
        form.resetFields();
        console.log(token);
    };

    const generarURL = (evt) => {
        // console.log("Pruebas");
        let file = evt.target.files[0];
        console.log(file);
        loadimageview(file);
        // uploadFile(file);
    };

    const loadimageview = (file)=>{
        console.log(file.name);
        setImageload(URL.createObjectURL(file))
    }

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
                    <Input id={`loadimage${datos.id}`} type="file" onChange={generarURL} />
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