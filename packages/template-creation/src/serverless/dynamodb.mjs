export const ServerlessDynamodb = (type, plop) => {
  /*
    Ex-
  ? Enter service folder name: order-resource-dynamodb
  ? Enter service key name: OrdersResourceDynamodb
  ? Enter `serverless-common.yml` table key: OrderTable
  ? Enter enter env variable name(give all uppercase without no space): ORDER_TABLE_NAME
    */
  const currentDir = process.cwd() 
  const ServerLessWholeProject = "serverless-dynamodb";
  const servicesFolder = "services";
  plop.setHelper(
    "generateFolderName",
    (str) => `${str.trim().replaceAll(/\s/g, "-").toLowerCase()}`
  );

  plop.setGenerator(type, {
    description: "(Serverless) Service Dynamodb generate",
    prompts: [
      {
        type: "input",
        name: "serviceFolderName",
        message: "Enter service folder name: ",
      },
      {
        type: "input",
        name: "serviceName",
        message: "Enter service key name: ",
      },
      {
        type: "input",
        name: "commonTableKey",
        message: "Enter `serverless-common.yml` table key: ",
      },
      {
        type: "input",
        name: "envVariable",
        message:
          "Enter enter env variable name(give all uppercase without no space): ",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${currentDir}/{{generateFolderName  serviceFolderName}}/package.json`,
        templateFile: `templates/serverless/${ServerLessWholeProject}/package.hbs`,
      },
      {
        type: "add",
        path: `${currentDir}/{{generateFolderName   serviceFolderName}}/serverless.yml`,
        templateFile: `templates/serverless/${ServerLessWholeProject}/serverless.hbs`,
      },
    ],
  });
};
