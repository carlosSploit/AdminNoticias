import React from "react";
import {
  Form,
  message,
  Typography,
  Table,
  Button,
} from "antd";

export default function Registro() {

  const key = 'updatable';

  const { Title } = Typography;

  const dataSource = [
    {
      key: '1',
      url: '.jpg',
      name: 'Empresa S.A.C',
      category: 'Construcción',
      score: 50,
    },
    {
      key: '2',
      url: '.jpg',
      name: 'Umbrella S.A.C',
      category: 'Construcción',
      score: 11,
    },
    {
      key: '3',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '4',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '5',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '6',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '7',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '8',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '9',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '10',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '11',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
    {
      key: '12',
      url: '.jpg',
      name: 'Grifos S.A.C',
      category: 'Construcción',
      score: 19,
    },
  ];
  
  const columns = [
    {
      title: 'Logo',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Descripción',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Puntaje',
      dataIndex: 'score',
      key: 'score',
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
      render: text => <a>{text}</a>,
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
  }

  const openMessage = () => {
    message.loading({ content: 'Cargando...', key, duration: 2 });
    setTimeout(() => {
      message.success({ content: 'Empresa S.A.C.', key, duration: 7 });
    }, 1000);
  };

  return (
    <Form>
      <Form.Item>
        <Title level={2}> Reportes de votaciones </Title>
        <Form.Item>
          <Table dataSource={dataSource} columns={columns} onChange={onChange}/>
          <Button onClick={openMessage}> Ganador de las votaciones 00/00/00 </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
