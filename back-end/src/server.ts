import "dotenv/config";

import App from "./app";
import EventsController from "./events/events.controllers";
import { validateEnv } from "./utils/validateEnv";

validateEnv();

export const app = new App([new EventsController()]);

app.listen();
