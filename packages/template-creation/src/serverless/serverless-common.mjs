export const ServerlessCommonGenerate = (type, plop) => {
  /*
    Ex-

    */
  plop.setHelper(
    "generateFolderName",
    (str) => `${str.trim().replaceAll(/\s/g, "-").toLowerCase()}`
  );
  const currentDir = process.cwd();
  plop.setGenerator(type, {
    description: "(Serverless) Service `serverless-common.yml` generate",
    prompts: [
      {
        type: "input",
        name: "orgName",
        message: "Enter org name: ",
      },
      {
        type: "input",
        name: "appName",
        message: "Enter app name: ",
      },
    ],
    actions: [
      {
        type: "add",
        path: `${currentDir}/serverless-common.yml`,
        templateFile: `templates/serverless/serverless-common.hbs`,
      },
    ],
  });
};
