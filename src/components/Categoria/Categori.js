import React, { useState, useEffect} from "react";
import { Form, Typography, Table, Space, Row, Col } from "antd";
import ModelButton from "./model"
import { getListcategori } from "../../config/categori";
import ModelInsert from "./modelinsert"


export default function Categori() {
  const [listCategori,setlistCategori] = useState([{id:1,nombre: "Default"}]);

  useEffect(() => {
    (list_categori)();
  }, []);

  const key = "updatable";

  const { Title } = Typography;

  const list_categori = async () =>{
    const response4 = await getListcategori();
    setlistCategori(response4);
  }

  const columns = [
    { title: "id", 
      dataIndex: "id", 
      key: "id" 
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "name",
    },
    {
      title: "Acciones",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <ModelButton
            datos = {record}
            callback = {list_categori}
          ></ModelButton>
        </Space>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <Form>
      <Form.Item>
        <Row justify="space-between">
          <Col>
              <Title level={2}> Lista de Categorias </Title>
          </Col>
          <Col>
            {/* Aperturar una nueva votacion */}
            <ModelInsert click = { async ()=>{
            }} callback = {list_categori}
            />
          </Col>
        </Row>
        <div style={{height:"20px"}}/>
        <Form.Item>
          <Table dataSource={listCategori} columns={columns} onChange={onChange} />
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
