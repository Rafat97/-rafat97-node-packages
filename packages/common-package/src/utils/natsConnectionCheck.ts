import { NatsStreamingClientHelper } from "./NatsStreamingClientHelper";

// http://localhost:8222/streaming/clientsz
// https://docs.nats.io/legacy/stan/intro/monitoring/endpoints

export const natsConnectionCheckSync = async (
  clusterId: string,
  clientId: string,
  url: string
) => {
  try {
    await NatsStreamingClientHelper.getInstance().connect(
      clusterId,
      clientId,
      url
    );
    const client = NatsStreamingClientHelper.getInstance().client;

    client.on("close", () => {
      console.log("NATS connection closed");
      process.exit();
    });

    process.on("SIGINT", () => client.close());
    process.on("SIGTERM", () => client.close());

    console.log("Connected to NATS");
  } catch (error) {
    console.error(error);
    console.log("Error connecting to NATS");
  }
};
