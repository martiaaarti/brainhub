import express from "express";

import { validationResult } from "express-validator";

import HttpError from "../errors/HttpError";
import validateMiddleware from "../middleware/validate.middleware";
import Controller from "./controller.interface";
import IEvent from "./event.interface";
import eventModel from "./events.model";

class EventsController implements Controller {
  public path = "/events";
  public router = express.Router();
  private event = eventModel;

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllEvents);
    this.router.post(
      this.path,
      validateMiddleware("createAnEvent"),
      this.createAnEvent
    );
  }

  // NOTE: for testing in Postman purposes
  private getAllEvents = (
    request: express.Request,
    response: express.Response
  ) => {
    eventModel.find().then((events) => {
      response.send(events);
    });
  };

  private createAnEvent = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        response.status(422).json({ errors: errors.array() });
        return;
      }
      const eventData: IEvent = request.body;
      const createdEvent = new this.event(eventData);
      const savedPost = await createdEvent.save();
      response.status(201).send(savedPost);
    } catch (error) {
      return next(new HttpError(404, "Cannot create an event"));
    }
  };
}

export default EventsController;
