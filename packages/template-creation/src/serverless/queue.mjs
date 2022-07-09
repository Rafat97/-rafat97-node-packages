export const ServerlessQueue = (type, plop) => {
  /*
    Ex-
? Enter service folder name:  test-resource-sqs
? Enter service key name:  TestResourceSQS
? Enter `serverless-common.yml` queue key:  TestQueue
? Enter enter env variable name(give all uppercase without no space):  QUEUE_NAME
    */
  const currentDir = process.cwd();
  const ServerLessWholeProject = "serverless-queue";
  const servicesFolder = "services";
  plop.setHelper(
    "generateFolderName",
    (str) => `${str.trim().replaceAll(/\s/g, "-").toLowerCase()}`
  );

  plop.setGenerator(type, {
    description: "(Serverless) Service Queue & Dead Letter Queue generate",
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
        name: "commonQueueKey",
        message: "Enter `serverless-common.yml` queue key: ",
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
