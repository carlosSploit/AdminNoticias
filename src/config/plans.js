import axios from "axios";
import { token,domain_api } from "./constans";

export async function gettoken(){
    if (!localStorage.getItem(token)){
        const url = `${domain_api}/tokeniser/`;
        const toke = await axios.get(url);
        const result = toke.data.token;
        localStorage.setItem(token,result) 
        return result
    }else{
        return localStorage.getItem(token)
    }
}

export async function getplains(){
    
    const url = `${domain_api}/partic`;
    const result = await axios.get(url,{
        headers:{
            Authorization: `Bearer ${await gettoken()}`
        }
    });
    return result.data
}

export async function readplains(id){
    const id_negocio = id
    const url = `${domain_api}/partic/${id_negocio}`;
    const result = await axios.get(url,{
        headers:{
            Authorization: `Bearer ${await gettoken()}`
        }
    });
    return result.data
}

export async function addplains(jsondat = {}){
    const data = jsondat
    const url = `${domain_api}/partic`;
    const result = await axios.post(url,data,{
        headers:{
            "Authorization": `Bearer ${await gettoken()}`,
            "Content-Type": "application/json;charset=UTF-8"
        }
    });
    return result.data
}

export async function updateplains(id,jsondat = {}){
    const id_negocio = id
    const data = jsondat
    const url = `${domain_api}/partic/${id_negocio}`;
    const result = await axios.put(url,data,{
        headers:{
            "Authorization": `Bearer ${await gettoken()}`,
            "Content-Type": "application/json;charset=UTF-8"
        }
    });
    return result.data
}

export async function deleteplains(id){
    const id_negocio = id
    const url = `${domain_api}/partic/${id_negocio}`;
    const result = await axios.delete(url,{
        headers:{
            "Authorization": `Bearer ${await gettoken()}`
        }
    });
    return result.data
}

