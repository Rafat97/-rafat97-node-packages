import { DynamoDB } from "aws-sdk";
import { AWSError } from "aws-sdk/lib/error";

/**
 *
 * @class DynamoDBHelper
 *
 * @description
 * Base class for DynamoDB client this is singleton class.
 * In whole application it will create only one instance of object
 *
 * @example
 * const dynamoDBHelper = DynamoDBHelper.getInstance();
 * or
 *
 * const testingDynamodbConnection = {
 *  region: process.env.AWS_REGION || "us-east-1",
 * endpoint: "http://localhost:8000",
 * };
 * const dynamoDBHelper = DynamoDBHelper.getInstance(config);
 * dynamoDBHelper.putSync(params);
 *
 * @author rafat97
 *
 * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
 * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
 *
 */
export class DynamoDBHelper {
  private static instance: DynamoDBHelper | null;
  private static connectionClient: DynamoDB.DocumentClient;
  private static connection: DynamoDB;
  private static options: DynamoDB.Types.ClientConfiguration;

  private constructor() {
    // do nothing
  }

  /**
   *
   * Create the instance of dynamodb database. It will create 2 types of connection.
   * 1. DynamoDB.DocumentClient
   * 2. DynamoDB
   *
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#constructor-property
   * https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#constructor-property
   *
   * @param {DynamoDB.Types.ClientConfiguration} options
   * @returns {DynamoDBHelper}
   *
   */
  public static getInstance = (
    option: DynamoDB.Types.ClientConfiguration = {}
  ): DynamoDBHelper => {
    if (!DynamoDBHelper.instance) {
      DynamoDBHelper.instance = new DynamoDBHelper();
      DynamoDBHelper.options = option;
      DynamoDBHelper.connectionClient = DynamoDBHelper.createClientConnection(
        DynamoDBHelper.options
      );
      DynamoDBHelper.connection = DynamoDBHelper.createConnection(
        DynamoDBHelper.options
      );
    }
    return DynamoDBHelper.instance;
  };

  /**
   *
   * Destroy the singleton instance
   *
   * @returns void
   *
   */
  public static destroyInstance(): void {
    DynamoDBHelper.instance = null;
  }

  /**
   *
   * This function create DynamoDB document client with a set of configuration options.
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#constructor-property
   *
   * @param {DynamoDB.Types.ClientConfiguration} options
   * @returns DynamoDB.DocumentClient
   *
   */
  private static createClientConnection(
    options: DynamoDB.Types.ClientConfiguration
  ): DynamoDB.DocumentClient {
    return new DynamoDB.DocumentClient(options);
  }

  /**
   *
   * It creates DynamoDB with a set of configuration options.
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#constructor-property
   *
   * @param {DynamoDB.Types.ClientConfiguration} options
   * @returns DynamoDB
   *
   */
  private static createConnection(
    options: DynamoDB.Types.ClientConfiguration
  ): DynamoDB {
    return new DynamoDB(options);
  }

  /**
   *
   * Get the client connection
   *
   * @returns DynamoDB.DocumentClient
   */
  public getClientConnection: Function = (): DynamoDB.DocumentClient => {
    return DynamoDBHelper.connectionClient;
  };

  /**
   *
   * Get the client connection
   *
   * @returns DynamoDB.DocumentClient
   */
  public getConnection: Function = (): DynamoDB => {
    return DynamoDBHelper.connection;
  };

  /**
   *
   * Get the configuration
   *
   * @returns DynamoDB.Types.ClientConfiguration
   *
   */
  public getOptions: Function = (): DynamoDB.Types.ClientConfiguration => {
    return DynamoDBHelper.options;
  };

  /**
   *
   * Create a table asynchronous
   *
   * @returns DynamoDB.Types.ClientConfiguration
   *
   */
  public createTable: Function = (
    tableDefinition: DynamoDB.CreateTableInput
  ): void => {
    DynamoDBHelper.connection.createTable(
      tableDefinition,
      (err: AWSError, data: DynamoDB.CreateTableOutput) => {
        if (err) {
          console.log(err);
        } else {
          console.log(data);
        }
      }
    );
  };

  /**
   * Create a table using synchronized way
   *
   * @param tableDefinition
   */
  public createTableSync: Function = async (
    tableDefinition: DynamoDB.CreateTableInput
  ): Promise<DynamoDB.CreateTableOutput> => {
    return await DynamoDBHelper.connection
      .createTable(tableDefinition)
      .promise();
  };

  /**
   *
   * Putting item synchronized
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
   *
   * @param {DynamoDB.DocumentClient.PutItemInput} params
   * @returns  Promise<DynamoDB.DocumentClient.PutItemOutput>
   */
  public putSync: Function = async (
    params: DynamoDB.DocumentClient.PutItemInput
  ): Promise<DynamoDB.DocumentClient.PutItemOutput> => {
    const putItem = DynamoDBHelper.connectionClient.put(params).promise();
    return putItem;
  };

  /**
   *
   * Get item synchronized
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#get-property
   *
   * @param {DynamoDB.DocumentClient.GetItemInput} params
   * @returns  Promise<DynamoDB.DocumentClient.GetItemOutput>
   */
  public getSync: Function = async (
    params: DynamoDB.DocumentClient.GetItemInput
  ): Promise<DynamoDB.DocumentClient.GetItemOutput> => {
    const getItem = DynamoDBHelper.connectionClient.get(params).promise();
    return getItem;
  };

  /**
   *
   * Delete item synchronized
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#delete-property
   *
   * @param {DynamoDB.DocumentClient.DeleteItemInput} params
   * @returns Promise<DynamoDB.DocumentClient.DeleteItemOutput>
   */
  public deleteSync: Function = async (
    params: DynamoDB.DocumentClient.DeleteItemInput
  ): Promise<DynamoDB.DocumentClient.DeleteItemOutput> => {
    const deleteItem = DynamoDBHelper.connectionClient.delete(params).promise();
    return deleteItem;
  };

  /**
   *
   * Query item synchronized
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#query-property
   *
   * @param {DynamoDB.DocumentClient.QueryInput} params
   * @returns Promise<DynamoDB.DocumentClient.QueryOutput>
   */
  public querySync: Function = async (
    params: DynamoDB.DocumentClient.QueryInput
  ): Promise<DynamoDB.DocumentClient.QueryOutput> => {
    const queryItem = DynamoDBHelper.connectionClient.query(params).promise();
    return queryItem;
  };

  /**
   *
   * Scan item synchronized
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#scan-property
   *
   * @param {DynamoDB.DocumentClient.ScanInput} params
   * @returns Promise<DynamoDB.DocumentClient.ScanOutput>
   */
  public scanSync = async (
    params: DynamoDB.DocumentClient.ScanInput
  ): Promise<DynamoDB.DocumentClient.ScanOutput> => {
    const scanItem = DynamoDBHelper.connectionClient.scan(params).promise();
    return scanItem;
  };

  /**
   *
   * Update item synchronized
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#update-property
   *
   * @param {DynamoDB.DocumentClient.UpdateItemInput} params
   * @returns Promise<DynamoDB.DocumentClient.UpdateItemOutput>
   */
  public updateSync = async (
    params: DynamoDB.DocumentClient.UpdateItemInput
  ): Promise<DynamoDB.DocumentClient.UpdateItemOutput> => {
    const updateItem = DynamoDBHelper.connectionClient.update(params).promise();
    return updateItem;
  };

  /**
   *
   * Puts or deletes multiple items in one or more tables
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#batchWrite-property
   *
   * @param {DynamoDB.DocumentClient.BatchWriteItemInput} params
   * @returns Promise<DynamoDB.DocumentClient.BatchWriteItemOutput>
   */
  public batchWriteSync = async (
    params: DynamoDB.DocumentClient.BatchWriteItemInput
  ): Promise<DynamoDB.DocumentClient.BatchWriteItemOutput> => {
    const batchItem = DynamoDBHelper.connectionClient
      .batchWrite(params)
      .promise();
    return batchItem;
  };

  /**
   *
   * This operation returns the attributes of one or more items from one or more tables
   *
   * @documentation https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html#batchGetItem-property
   *
   * @param {DynamoDB.DocumentClient.BatchGetItemInput} params
   * @returns Promise<DynamoDB.DocumentClient.BatchGetItemOutput>
   */
  public batchGetSync = async (
    params: DynamoDB.DocumentClient.BatchGetItemInput
  ): Promise<DynamoDB.DocumentClient.BatchGetItemOutput> => {
    const batchGetItem = DynamoDBHelper.connectionClient
      .batchGet(params)
      .promise();
    return batchGetItem;
  };
}
