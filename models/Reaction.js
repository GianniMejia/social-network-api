import {
  connect,
  connection,
  Schema,
  model,
  Types,
} from "../config/connection.js";

export const reactionSchema = new Schema(
  {
    reactionId: {
      type: Types.ObjectId,
      default: new Types.ObjectId(),
      reactionBody: { type: String, required: true, maxLength: 280 },
      username: { type: String, required: true },
      createdAt: {
        type: Date,
        default: Date.now(),

        get: (v) => new Date(v).toISOString(),
      },
    },
  },
  {}
);
