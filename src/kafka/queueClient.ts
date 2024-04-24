import { EachMessagePayload, Kafka } from "kafkajs";
import { getRepository } from "typeorm";
import { User } from "../entity/user.entity";
const dotenv = require("dotenv");

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.QUEUE_CLIENT_ID,
  brokers: [process.env.QUEUE_BROKER],
  ssl: true,
  sasl: {
    mechanism: "plain",
    username: process.env.QUEUE_USERNAME,
    password: process.env.QUEUE_PASSWORD,
  },
});

const consumer = kafka.consumer({ groupId: process.env.QUEUE_CLIENT_ID });

export const QueueClient = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: process.env.QUEUE_TOPIC });
  await consumer.run({
    eachMessage: async (message: EachMessagePayload) => {
      const userFromQueue = JSON.parse(message.message.value.toString());
      const user = await getRepository(User).findOne({
        email: userFromQueue.email,
      });

      if (!user) {
        await getRepository(User).save({
          ...userFromQueue,
          is_admin: false,
        });
      }
    },
  });
};
