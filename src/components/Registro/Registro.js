import React from "react";
import { Form, Input, message, Button, Space } from "antd";

export default function Registro() {
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const generarURL = () => {
    console.log("Pruebas");
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
        name="name-local"
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
            Submit
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
}
