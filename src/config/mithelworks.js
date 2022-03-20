import { token,domain_api } from "./constans";
import axios from "axios";

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