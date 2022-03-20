import axios from "axios";
import { domain_api } from "./constans";
import { gettoken } from "./mithelworks";

export async function getpointsanalitic(){
    const url = `${domain_api}/votacion/analic`;
    const result = await axios.get(url,{
        headers:{
            Authorization: `Bearer ${await gettoken()}`
        }
    });
    return result.data
}


export async function getaperturevote(){
    const url = `${domain_api}/votacion/time`;
    const result = await axios.get(url,{
        headers:{
            Authorization: `Bearer ${await gettoken()}`
        }
    });
    return result.data
}