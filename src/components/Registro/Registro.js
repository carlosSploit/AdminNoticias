import React, { useState } from "react";
import { Form, Input, message, Button, Space } from "antd";
// import { uploadFile } from "../../service/uploadFile";
import { addplains } from "../../config/plans";
import {uploudImage} from "../../config/uploud_img"

export default function Registro() {
  const [form] = Form.useForm();
  //const [urlimageload, seturlimageload] = useState(); // url de la pagina 
  const [fieimage, setfieimage] = useState();

  const onFinish = async (evt) => {
    message.success("Registro Exitoso!");
    //console.log(evt);
    console.log(fieimage)
    if (!(fieimage["name"] !== undefined)){
      console.log("no presenta una imagen")
      return ;
    }

    const contador = await uploudImage(fieimage);
    let urlname = contador.data[0].url;
    console.log(`url image : ${urlname}`)
    
    const data = {
      nombre: evt.nameLocal,
      descripccion: evt.description,
      url: urlname,
    };

    const token = await addplains(data);
    form.resetFields();
    console.log(token);
    
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  /*
  {"messege":"imagen insertada correctamente",
  "data":[{
    "url":"http://res.cloudinary.com/noticiaslacana/image/upload/v1648146164/Images/y3rc4cpkas44g1kvrssh.jpg"
    ,"id":"Images/y3rc4cpkas44g1kvrssh"}
  ]}
  */

  const generarURL = async (evt) => {
    // console.log("Pruebas");
    let file = evt.target.files[0];
    //console.log(file.name);
    // const contador = await uploudImage(file);
    // const url = contador.data[0].url;
    //seturlimageload(URL.createObjectURL(file))
    setfieimage(file)
    console.log(file)
    // uploadFile(file);
  };

  return (
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
        rules={[{ required: true, message: "Por favor, Ingrese un nombre!" }]}
      >
        <Input type="text"></Input>
      </Form.Item>

      <Form.Item
        name="description"
        label="Descripción"
        rules={[
          { required: true, message: "Por favor, Ingrese una descripción!" },
        ]}
      >
        <Input type="text"></Input>
      </Form.Item>

      <Form.Item
        name="url"
        label="URL"
        rules={[{ required: true, message: "Por favor, Ingrese una URL!" }]}
      >
        <Input type="file" onChange={generarURL} accept="image/png, .jpeg, .jpg, image/gif" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
