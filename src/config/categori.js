import axios from "axios";
import { domain_api } from "./constans";
import { gettoken } from "./mithelworks";

export async function getListcategori() {
    try {
      const url = `${domain_api}/categ`;
      let config = {
        headers: {
          Authorization: `Bearer ${await gettoken()}`,
        },
      };

      const response = await axios.get(url, config);
      return response.data;
  
    } catch (error) {
      console.log(error);
      return null;
    }
}

export async function getcategori(id) {
  try {
    const url = `${domain_api}/categ/r/${id}`;
    let config = {
      headers: {
        Authorization: `Bearer ${await gettoken()}`,
      },
    };

    const response = await axios.get(url, config);
    return response.data;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatecategori(id,jsondat = {}){
  const id_cat = id
  const data = jsondat
  const url = `${domain_api}/categ/${id_cat}`;
  const result = await axios.put(url,data,{
      headers:{
          "Authorization": `Bearer ${await gettoken()}`,
          "Content-Type": "application/json;charset=UTF-8"
      }
  });
  return result.data
}

export async function insertcategori(jsondat = {}){
  const data = jsondat
  const url = `${domain_api}/categ/`;
  const result = await axios.post(url,data,{
      headers:{
          "Authorization": `Bearer ${await gettoken()}`,
          "Content-Type": "application/json;charset=UTF-8"
      }
  });
  return result.data
}
// export async function getaperturtime(){
//     const url = `${domain_api}/votacion/time`;
//     const result = await axios.get(url,{
//         headers:{
//             Authorization: `Bearer ${await gettoken()}`
//         }
//     });
//     return result.data
// }

// export async function getaperturevotacion(){
//     const url = `${domain_api}/votacion/aperture`;
//     const result = await axios.get(url,{
//         headers:{
//             Authorization: `Bearer ${await gettoken()}`
//         }
//     });
//     return result.data
// }