import React, { useState } from 'react';
import { Form, Input, message, Button, Space,Modal,Image,Select } from "antd";
import {readplains, updateplains} from '../../config/plans'
import {uploudImage} from "../../config/uploud_img"
import { getcategori,updatecategori } from '../../config/categori';


export default function Model(props){
    const [form] = Form.useForm();
    const {datos,callback} = props;
    // estados
    const [datup , setdatup] = useState({
        id : 0,
        nombre: "",
        urlcode : ""
    })
    const [statemodel, setmodel] = useState();


    const loadcategori = async () => {
        // extrae la informacion de la apirees
        let token = await getcategori(datos.id);
        setdatup(token);
        console.log(token);
    }

    const cancel_update = ()=>{
        setmodel(false);
    }

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };

    const onFinish = async (evt) => {
        if(evt.codigohtml === datup.urlcode && evt.name === datup.nombre){
            message.error("No se a realizado ningun cambio");
            return;
        }

        const data = {
          nombre: evt.name,
          codeurl: evt.codigohtml
        };
        const token = await updatecategori(datup.id,data);
        console.log(token);
        await loadcategori();
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

    return (
        <>
          <Button type="primary" onClick={ async () => {
              await loadcategori();
              setmodel(true);
          }}>
            Update
          </Button>
          <Modal
            title="Actualizar Categoria"
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
            <div>Ingresa el codigo iframe de la pagina de Youtube</div>
            <br/>
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    name="name"
                    label="name"
                    initialValue={datup.nombre}
                    rules={[
                    { required: true, message: "Por favor, Ingrese un nombre!" },
                    ]}
                >
                    <Input type="text"></Input>
                </Form.Item>
                <Form.Item
                    initialValue={datup.urlcode}
                    name="codigohtml"
                >
                    <Input.TextArea style={{
                        height: "120px"
                    }} onChange={(item)=>{
                        // console.log(item.currentTarget.value);
                        form.setFieldsValue({codigohtml: item.currentTarget.value.replace("560","100%")});
                    }} />
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