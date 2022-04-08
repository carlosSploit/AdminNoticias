import React from "react";
import "./cargando.css";

export default function Cargando(){
    return (
        <div style={{width:"100%",
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "center", 
                     height:"40vh"}}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection:"column",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100px"
                }}
            >
                <img className="imageagrade" src={require("../../../Assets/images/business-3d-girl-with-coffee.png")} alt="" />
                <div style={{height:"20px"}}/>
                <div
                    className="titleagradec"
                >
                    Cargando los participantes ...
                </div>
                <div style={{height:"10px"}}/>
                <div>
                    Espere porfavor
                </div>
            </div>
        </div>
    );
}