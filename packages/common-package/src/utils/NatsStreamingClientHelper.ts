import nats, { Stan } from "node-nats-streaming";

export class NatsStreamingClientHelper {
  // singleton instance
  private static _instance?: NatsStreamingClientHelper;
  private _client?: Stan;
  private constructor() {}

  static getInstance() {
    if (!NatsStreamingClientHelper._instance) {
      NatsStreamingClientHelper._instance = new NatsStreamingClientHelper();
    }
    return NatsStreamingClientHelper._instance;
  }

  static destroyInstance() {
    if (!NatsStreamingClientHelper._instance) {
      NatsStreamingClientHelper._instance = undefined;
    }
  }

  get client() {
    if (!this._client) {
      throw new Error("Nats client is not connected");
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });

    return new Promise<void>((resolve, reject) => {
      this._client!.on("connect", () => {
        resolve();
      });
      this._client!.on("error", (err) => {
        reject(err);
      });
    });
  }
}
