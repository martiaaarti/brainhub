import { body } from "express-validator";

function validateMiddleware(method: string) {
  switch (method) {
    case "createAnEvent": {
      return [
        body("firstName", `First name doesn't exists`).exists(),
        body("lastName", `Last name doesn't exists`).exists(),
        body("email", "Invalid email").exists().isEmail(),
        body("date", "Invalid date").exists().isISO8601(),
      ];
    }
  }
}

export default validateMiddleware;
