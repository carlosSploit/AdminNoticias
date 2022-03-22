// import "./aws_config";
// import AWS from "aws-sdk";
// import { buckupName } from "../config/constans";

// const { BUCKET_NAME } = require("../config/constans");

// export const uploadFile = (fileName) => {
//   let bucket = new AWS.S3({ params: { Bucket: buckupName } });

//   if (fileName) {
//     var uploadParams = {
//       Key: fileName.name,
//       ContentType: fileName.type,
//       Body: fileName,
//     };
//     bucket
//       .upload(uploadParams)
//       .on("httpUploadProgress", function (evt) {})
//       .send(function (err, data) {
//         console.log("Subida correctamente", data);
//       });
//   }
//   return false;
//     let reader = new FileReader();
//     reader.onload = (e) => {
//       Cuando el archivo se terminó de cargar
//       console.log(e.name);
//       uploadFile(e.name);
//     };
//     Leemos el contenido del archivo seleccionado
//     reader.readAsText(fileName);
//     Read content from the file
//     const fileContent = fs.readFile(fileName);
//     Setting up S3 upload parameters
//     const params = {
//       Bucket: BUCKET_NAME,
//       Key: "cat.jpg", // File name you want to save as in S3
//       Body: fileContent,
//     };
//     Uploading files to the bucket
//     AWS.S3.upload(params, function (err, data) {
//       if (err) {
//         throw err;
//       }
//       return console.log(`Archivo subido correctamente. ${data.Location}`);
//     });
// };
