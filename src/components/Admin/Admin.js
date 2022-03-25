import React, { useState } from "react";

import { Layout, Menu, Breadcrumb } from "antd";
import { BarChartOutlined, PlusOutlined } from "@ant-design/icons";

import Registro from "../Registro/Registro";
import Reportes from "../Reportes/Reportes";

import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

export default function Admin() {
  const [collapsed, setCollapsed] = useState(false);
  const [indexInterface, setindexInterface] = useState(0);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

const clickcambio = (index) => {
  setindexInterface(index)
}

const listpanel = [<Registro />, <Reportes />]

return (
  <Router>
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"/>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PlusOutlined />} onClick={()=>{clickcambio(0)}}>
            {/* <Link to="/" /> */}
            Registro de lugares
          </Menu.Item>

          <Menu.Item key="2" icon={<BarChartOutlined />} onClick={()=>{clickcambio(1)}}>
            {/* <Link to="/report" /> */}
            Ver Votaciones
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}
        />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>LaCaña.pe</Breadcrumb.Item>
            <Breadcrumb.Item>...</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {listpanel[indexInterface]}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2022 Created by worldSystem
        </Footer>
      </Layout>
    </Layout>
  </Router>
);
}