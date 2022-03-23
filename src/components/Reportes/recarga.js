import { Button, Space } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import React, {useState} from 'react';


// class App extends React.Component {
//   state = {
//     loadings: [],
//   };

//   enterLoading = index => {
//     this.setState(({ loadings }) => {
//       const newLoadings = [...loadings];
//       newLoadings[index] = true;

//       return {
//         loadings: newLoadings,
//       };
//     });
//     setTimeout(() => {
//       this.setState(({ loadings }) => {
//         const newLoadings = [...loadings];
//         newLoadings[index] = false;

//         return {
//           loadings: newLoadings,
//         };
//       });
//     }, 6000);
//   };

//   render() {
//     const { loadings } = this.state;
//     return (
//       <>
//         <Space style={{ width: '100%' }}>
//           <Button type="primary" loading>
//             Loading
//           </Button>
//           <Button type="primary" size="small" loading>
//             Loading
//           </Button>
//           <Button type="primary" icon={<PoweroffOutlined />} loading />
//         </Space>

//         <Space style={{ width: '100%' }}>
//           <Button type="primary" loading={loadings[0]} onClick={() => this.enterLoading(0)}>
//             Click me!
//           </Button>
//           <Button
//             type="primary"
//             icon={<PoweroffOutlined />}
//             loading={loadings[1]}
//             onClick={() => this.enterLoading(1)}
//           >
//             Click me!
//           </Button>
//           <Button
//             type="primary"
//             icon={<PoweroffOutlined />}
//             loading={loadings[2]}
//             onClick={() => this.enterLoading(2)}
//           />
//         </Space>
//       </>
//     );
//   }
// }

// ReactDOM.render(<App />, mountNode);


export default function Bottonload(props){
    const [load, getload] = useState(false);
    const {click} = props;

    async function enterLoading() {
        getload(true);
        const resul = await click();
        console.log(resul);
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