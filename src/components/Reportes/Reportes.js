import React, { useState, useEffect } from "react";
import { Form, message, Typography, Table, Button, Space } from "antd";
import { getaperturevote, getpointsanalitic } from "../../config/votacions";
import { deleteplains } from "../../config/plans";

export default function Registro() {
  const [data, setData] = useState();
  const [fechaApertura, setFechaApertura] = useState({});

  useEffect(() => {
    (async () => {
      const token = await getpointsanalitic();
      //console.log(token);
      const data2 = token.map((item) => {
        return {
          key: item.id_negocio,
          id: item.id_negocio,
          name: item.nombre,
          category: item.descripccion,
          score: item.puntaje,
          porcent: item.promedio,
        };
      });
      setData(data2);
    })();
  }, [data]);

  useEffect(() => {
    (async () => {
      const time = await getaperturevote();
      //console.log(time.code_time);
      const anno = time.code_time.slice(0, 4);
      const mes = time.code_time.slice(4, 6);
      const dia = time.code_time.slice(6, 8);

      const data = {
        anno: anno,
        mes: mes,
        dia: dia,
      };
      //console.log(data);
      setFechaApertura(data);
    })();
  }, []);

  const key = "updatable";

  const { Title } = Typography;

  const columns = [
    { title: "id", dataIndex: "id", key: "id" },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Puntaje",
      dataIndex: "score",
      key: "score",
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Porcentaje",
      dataIndex: "porcent",
      key: "porcent",
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
    },
    {
      title: "Acciones",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={editarLugar(record.key)}>Editar</Button>
          <Button
            onClick={() => {
              eliminarLugar(record);
            }}
          >
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  function editarLugar(id) {}

  async function eliminarLugar(id) {
    //console.log(id);
    const token = await deleteplains(id.id);
    console.log(token);
  }

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  const openMessage = async () => {
    console.log(data[0]);
    message.loading({ content: "Cargando...", key, duration: 2 });
    setTimeout(() => {
      message.success({
        content: `Empresa GANADORA ${data[0].name}`,
        key,
        duration: 17,
      });
    }, 1000);
  };

  //console.log(fechaApertura);

  return (
    <Form>
      <Form.Item>
        <Title level={2}> Reportes de votaciones </Title>
        <Form.Item>
          <Table dataSource={data} columns={columns} onChange={onChange} />
          <Button onClick={openMessage}>
            {" "}
            Ganador de las votaciones a la fecha: {fechaApertura.dia}/
            {fechaApertura.mes}/{fechaApertura.anno}{" "}
          </Button>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
