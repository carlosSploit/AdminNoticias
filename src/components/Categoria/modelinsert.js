import React, { useState } from 'react';
import { Form, Input, message, Button, Space,Modal } from "antd";
import { insertcategori} from '../../config/categori';


export default function Model(props){
    const [form] = Form.useForm();
    const {datos,callback} = props;
    // estados
    const [statemodel, setmodel] = useState();

    const cancel_update = ()=>{
        setmodel(false);
    }

    const onFinishFailed = () => {
        message.error("Submit failed!");
    };

    const onFinish = async (evt) => {
        if(evt.codigohtml === ""){
            message.error("No se a ingresado ningun nombre");
            return;
        }

        const data = {
            nombre: evt.name
        };
        const token = await insertcategori(data);
        console.log(token);
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
              setmodel(true);
          }}>
            Insertar Categoria
          </Button>
          <Modal
            title="Actualizar Categoria"
            centered
            visible={statemodel}
            onOk={() => {
                document.getElementById(`insertcategori`).click()
            }}
            onCancel={() => {
                cancel_update();
            }}
          >
        <div>
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
                    rules={[
                    { required: true, message: "Por favor, Ingrese un nombre!" },
                    ]}
                >
                    <Input type="text"></Input>
                </Form.Item>
                <Form.Item>
                    <Space>
                    <Button
                        style={{
                            display: "none"
                        }} 
                        id={`insertcategori`} 
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