import React, { useState, useEffect } from "react";
import { Form, Input, message, Button, Space, Select } from "antd";
// import { uploadFile } from "../../service/uploadFile";
import { addplains } from "../../config/plans";
import { uploudImage } from "../../config/uploud_img";
import { getListcategori } from "../../config/categori";

export default function Registro() {
  const [form] = Form.useForm();
  //const [urlimageload, seturlimageload] = useState(); // url de la pagina
  const [fieimage, setfieimage] = useState();
  const [listCategori, setlistCategori] = useState([
    { id: 1, nombre: "Default" },
  ]);
  const [category, setCategory] = useState({ id: 1, nombre: "Default" });

  useEffect(() => {
    (async () => {
      const response4 = await getListcategori();
      setlistCategori(response4);
    })();
  }, []);

  const onFinish = async (evt) => {
    message.success("Registro Exitoso!");
    //console.log(evt);
    console.log(fieimage);
    if (!(fieimage["name"] !== undefined)) {
      console.log("no presenta una imagen");
      return;
    }

    const contador = await uploudImage(fieimage);
    let urlname = contador.data[0].url;
    console.log(`url image : ${urlname}`);

    const data = {
      nombre: evt.nameLocal,
      descripccion: evt.description,
      url: urlname,
      id_cat: evt.id_categ,
    };

    const token = await addplains(data);
    form.resetFields();
    setCategory(listCategori[0]);
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
    setfieimage(file);
    console.log(file);
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
        name="id_categ"
        label="Categoria"
        rules={[
          { required: true, message: "Por favor, Ingrese una Categoria!" },
        ]}
        initialValue={category.nombre}
        onChange={(value) => {
          let dato = listCategori.filter((item) => {
            return item.id.toString() === value.toString();
          });
          let datos = Array.isArray(dato) ? dato[0] : dato;
          setCategory(datos);
        }}
      >
        <Select>
          {listCategori.map((item) => {
            return (
              <Select.Option value={`${item.id}`}>{item.nombre}</Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item
        name="url"
        label="URL"
        rules={[{ required: true, message: "Por favor, Ingrese una URL!" }]}
      >
        <Input
          type="file"
          onChange={generarURL}
          accept="image/png, .jpeg, .jpg, image/gif"
        />
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
