import { DynamoDB } from "aws-sdk";
import { DynamoDBHelper } from "../src/index";

const testingDynamodbConnection = {
  region: process.env.AWS_REGION || "us-east-1",
  endpoint: "http://localhost:8000",
};

const table_definition = {
  TableName: `test-table-${Date.now()}`,
  KeySchema: [
    { AttributeName: "PK", KeyType: "HASH" }, //Partition key
    { AttributeName: "SK", KeyType: "RANGE" }, //Sort key
  ],
  AttributeDefinitions: [
    { AttributeName: "PK", AttributeType: "S" },
    { AttributeName: "SK", AttributeType: "S" },
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10,
  },
};

/**
 *
 * For running these tests, you need dynamodb running locally.
 * You can use this docker-compose file-
 * https://github.com/Rafat97/my-docker/blob/master/DynamoDB/docker-compose.yml
 *
 * just run [docker-compose up -d --build].
 *
 */

describe("DynamoDBHelper", () => {
  it("Create Sync table", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );

    expect(dynamoDBHelper).toHaveProperty("createTable");
    expect(dynamoDBHelper).toHaveProperty("createTableSync");
    const createTable = await dynamoDBHelper.createTableSync(table_definition);

    // After  table create output
    // {
    //   TableDescription: {
    //     AttributeDefinitions: [ [Object], [Object] ],
    //     TableName: 'test-table-1651316450922',
    //     KeySchema: [ [Object], [Object] ],
    //     TableStatus: 'ACTIVE',
    //     CreationDateTime: 2022-04-30T11:00:51.007Z,
    //     ProvisionedThroughput: {
    //       LastIncreaseDateTime: 1970-01-01T00:00:00.000Z,
    //       LastDecreaseDateTime: 1970-01-01T00:00:00.000Z,
    //       NumberOfDecreasesToday: 0,
    //       ReadCapacityUnits: 10,
    //       WriteCapacityUnits: 10
    //     },
    //     TableSizeBytes: 0,
    //     ItemCount: 0,
    //     TableArn: 'arn:aws:dynamodb:ddblocal:000000000000:table/test-table-1651316450922'
    //   }
    // }
    expect(createTable.TableDescription.TableName).toBe(
      table_definition.TableName
    );
    expect(createTable.TableDescription.TableStatus).toBe("ACTIVE");
  });

  it("Put Sync table Sync", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );
    expect(dynamoDBHelper).toHaveProperty("putSync");
    const item = {
      PK: `${`TestPK`}`,
      SK: `${`TestSK`}`,
    };

    const params = {
      TableName: table_definition.TableName,
      Item: { ...item },
      ReturnValues: "ALL_OLD", //https://github.com/aws/aws-sdk-js/issues/803
    };
    const insertData = await dynamoDBHelper.putSync(params);
  });

  it("Get Sync table Sync", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );
    expect(dynamoDBHelper).toHaveProperty("getSync");
    let params = {
      TableName: table_definition.TableName,
      Key: {
        PK: `${`TestPK`}`,
        SK: `${`TestSK`}`,
      },
    };

    const getData = await dynamoDBHelper.getSync(params);

    // example data return
    // { Item: { SK: 'TestSK', PK: 'TestPK' } }

    expect(getData.Item).toMatchObject({
      SK: "TestSK",
      PK: "TestPK",
    });
  });

  it("Update Sync table Sync", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );
    expect(dynamoDBHelper).toHaveProperty("updateSync");
    var params = {
      TableName: table_definition.TableName,
      Key: {
        SK: "TestSK",
        PK: "TestPK",
      },
      UpdateExpression: "set #crnt = :current",
      // ConditionExpression: "#a < :MAX",
      ExpressionAttributeNames: {
        "#crnt": "current",
      },
      ExpressionAttributeValues: {
        ":current": 0,
      },
      ReturnValues: "UPDATED_NEW",
    };
    const updateData = await dynamoDBHelper.updateSync(params);
    expect(updateData.Attributes).toMatchObject({
      current: 0,
    });
  });

  it("Update Sync table Sync", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );
    expect(dynamoDBHelper).toHaveProperty("deleteSync");
    var params = {
      TableName: table_definition.TableName,
      Key: {
        SK: "TestSK",
        PK: "TestPK",
      },
      ReturnValues: "ALL_OLD",
    };

    const deleteData = await dynamoDBHelper.deleteSync(params);
    expect(deleteData.Attributes).toMatchObject({
      SK: "TestSK",
      current: 0,
      PK: "TestPK",
    });
  });

  it("Batch write table Sync", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );
    expect(dynamoDBHelper).toHaveProperty("batchWriteSync");
    var params = {
      RequestItems: {
        [table_definition.TableName]: [
          {
            PutRequest: {
              Item: {
                PK: `${`TestPK`}`,
                SK: `${`TestSK`}`,
                current: 0,
              },
            },
          },
        ],
      },
      ReturnConsumedCapacity: "TOTAL",
      ReturnItemCollectionMetrics: "SIZE",
    };

    const batchWriteData = await dynamoDBHelper.batchWriteSync(params);
    expect(batchWriteData.ConsumedCapacity).toEqual([
      { TableName: table_definition.TableName, CapacityUnits: 1 },
    ]);
  });

  it("Batch Read table Sync", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );
    expect(dynamoDBHelper).toHaveProperty("batchGetSync");
    let params = {
      RequestItems: {
        [table_definition.TableName]: {
          Keys: [
            {
              PK: `${`TestPK`}`,
              SK: `${`TestSK`}`,
            },
          ],
        },
      },
    };

    const batchGetData = await dynamoDBHelper.batchGetSync(params);
    expect(batchGetData.Responses).toEqual({
      [table_definition.TableName]: [
        { SK: "TestSK", current: 0, PK: "TestPK" },
      ],
    });
  });

  it("destroy and recreate ", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );
    const option = dynamoDBHelper.getOptions();
    const docuConnection = dynamoDBHelper.getClientConnection();
    expect(docuConnection).toBeInstanceOf(DynamoDB.DocumentClient);

    const conn = dynamoDBHelper.getConnection();
    expect(conn).toBeInstanceOf(DynamoDB);

    expect(option.endpoint).toBe(testingDynamodbConnection.endpoint);
    expect(option.region).toBe(testingDynamodbConnection.region);

    DynamoDBHelper.destroyInstance();

    const newDynamodb = DynamoDBHelper.getInstance();
    const option2 = newDynamodb.getOptions();

    expect(option2?.endpoint).toBe(undefined);
    expect(option2?.region).toBe(undefined);

    // re-destroy
    DynamoDBHelper.destroyInstance();
  });

  it("query data", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );

    const params = {
      TableName: table_definition.TableName,
      // IndexName: 'Index',
      KeyConditionExpression: "PK = :pk and SK = :sk",
      ExpressionAttributeValues: {
        ":pk": `${`TestPK`}`,
        ":sk": `${`TestSK`}`,
      },
    };
    const data = await dynamoDBHelper.querySync(params);
    expect(data.Items).toEqual([{ SK: "TestSK", current: 0, PK: "TestPK" }]);
  });

  it("scan data", async () => {
    const dynamoDBHelper = DynamoDBHelper.getInstance(
      testingDynamodbConnection
    );

    const params = {
      TableName: table_definition.TableName,
      FilterExpression: "PK = :pk",
      ExpressionAttributeValues: { ":pk": "TestPK" },
    };
    const data = await dynamoDBHelper.scanSync(params);
    expect(data.Items).toEqual([{ SK: "TestSK", current: 0, PK: "TestPK" }]);
    expect(data.ScannedCount).toEqual(1);
  });
});
