import React, { useState } from "react";

import { Form, Input, Button, message,Layout,Image } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loggin } from "../../config/plans";
import { gettoken } from "../../config/mithelworks";


export default function Admin(props) {

    const {callback} = props;
    const [erroclick, geterrorclick] = useState(0)

    const onFinish = async (values) => {
        //console.log('Received values of form: ', values);
        const result = await loggin({
            "usser": values.username,
            "pass": values.password
        })

        if (result.logus) {
            const token = await gettoken();
            message.success("Logeo correcto !");
            callback();
        }else{
            document.getElementById("logbut").disabled = ((erroclick+1) === 3)? true:false;
            geterrorclick(erroclick+1)
            message.error("Usuario invalido!");
        }
        
    };

    const onFinishFailed = () => {

        message.error("Error al validar!");
    };

    return (
        <Layout style={{background:"#81c784" ,minHeight: "100vh", display: "flex", alignItems: "center", justifyContent:"center"
        }}>
            <div style={{background: "white", paddingTop: "30px", paddingBottom: "30px", paddingLeft:"20px", paddingRight:"20px" ,borderEndEndRadius:"20px",
                borderEndStartRadius:"20px",
                borderStartEndRadius: "20px",
                borderStartStartRadius: "20px" }}>
            <Form
            name="normal_login"
            className="login-form"
            onFinishFailed={onFinishFailed}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            >
            <div style={{ width:"100%" ,display: "flex", alignItems: "center", justifyContent:"center"}}>
                <img style={{
                    borderRadius: "50%",
                    border: "none" ,
                    width:"100px",
                    height:"100px",
                    background: "#e2f1f8"
                }}  src= {require("../../Assets/images/imagelogin.jpeg")} /> 
            </div>
            <div style={{height:"30px"}}/>
            <Form.Item>
                <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>Bienvenido al apartado de Admin</div>
            </Form.Item>
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                {
                    (erroclick !== 3)?
                    <div style={{display: "flex", alignItems: "center", justifyContent:"center"}}>Preciona para iniciar</div>
                    :
                    <div style={{display: "flex", alignItems: "center", justifyContent:"center", color:"#f44336"}}>Oportunidades culminadas</div>
                }
            </Form.Item>

            <Form.Item>
                <Button 
                id="logbut"
                type="primary" 
                htmlType="submit" 
                className="login-form-button"
                style={{
                    width: "100%",
                    borderEndEndRadius:"10px",
                    borderEndStartRadius:"10px",
                    borderStartEndRadius: "10px",
                    borderStartStartRadius: "10px"
                }}>
                    Log in
                </Button>
            </Form.Item>
            </Form>
            </div>
        </Layout>
    );
    }