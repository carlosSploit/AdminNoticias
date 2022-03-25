import { Button } from 'antd';
import React, {useState} from 'react';


export default function Bottonload(props){
    const [load, getload] = useState(false);
    const {click,callback} = props;

    async function enterLoading() {
        getload(true);
        const resul = await click();
        console.log(resul);
        await callback();
        getload(false);
      };

    return (
        <>
          <Button 
                type="primary" 
                loading={load}
                onClick={() => enterLoading()}
            >
              {"Activar las elecciones"}
            </Button>
        </>
      );
}