import { ServerlessDynamodb } from "./src/serverless/dynamodb.mjs";
import { ServerlessCommonGenerate } from "./src/serverless/serverless-common.mjs";

const plopFun = (plop) => {
  console.log(process.cwd()+"\n")
  ServerlessDynamodb(1, plop);
  ServerlessCommonGenerate(2, plop);
};

export default plopFun;
