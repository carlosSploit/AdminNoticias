import React from "react";
import { Form, Input, message, Button, Space } from "antd";
// import { uploadFile } from "../../service/uploadFile";
import { addplains } from "../../config/plans";

export default function Registro() {
  const [form] = Form.useForm();

  const onFinish = async (evt) => {
    message.success("Registro Exitoso!");
    //console.log(evt);
    const data = {
      nombre: evt.nameLocal,
      descripccion: evt.description,
      url: evt.url,
    };

    const token = await addplains(data);
    form.resetFields();
    console.log(token);
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const generarURL = (evt) => {
    // console.log("Pruebas");
    // let file = evt.target.files[0];
    // console.log(file.name);
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
        <Input type="file" onChange={generarURL} />
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
