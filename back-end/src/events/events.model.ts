import mongoose from "mongoose";

import IEvent from "./event.interface";

const eventSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  date: Date,
});

const eventModel = mongoose.model<IEvent & mongoose.Document>(
  "Event",
  eventSchema
);

export default eventModel;
