import AWS from "aws-sdk";
import { id, secretKey, region } from "../config/constans";

AWS.config.update({
  accessKeyId: id,
  secretAccessKey: secretKey,
});
AWS.config.region = region;
