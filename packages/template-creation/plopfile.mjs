import { ServerlessDynamodb } from "./src/serverless/dynamodb.mjs";
import { ServerlessQueue } from "./src/serverless/queue.mjs";
import { ServerlessCommonGenerate } from "./src/serverless/serverless-common.mjs";

const plopFun = (plop) => {
  console.log(process.cwd() + "\n");
  ServerlessDynamodb(1, plop);
  ServerlessCommonGenerate(2, plop);
  ServerlessQueue(3, plop);
};

export default plopFun;
