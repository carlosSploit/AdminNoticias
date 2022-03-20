import axios from "axios";
import { token,domain_api } from "./constans";
import { gettoken } from "./plans";

export async function getpointsanalitic(){
    
    const url = `${domain_api}/votacion/analic`;
    const result = await axios.get(url,{
        headers:{
            Authorization: `Bearer ${await gettoken()}`
        }
    });
    return result.data
}