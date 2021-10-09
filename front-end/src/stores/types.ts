import { DateTime } from "luxon";
import { types } from "mobx-state-tree";

export const LuxonDateTimeOrNull = types.custom<string | null, DateTime | null>(
  {
    name: "LuxonDateTimeOrNull",
    fromSnapshot(value) {
      return value === null ? null : DateTime.fromISO(value);
    },
    toSnapshot(value) {
      return value === null ? null : value.toUTC().toISO();
    },
    isTargetType(value) {
      return value instanceof DateTime || value === null;
    },
    getValidationMessage(value) {
      try {
        if (value === null) {
          return "";
        }
        DateTime.fromISO(value);
        return "";
      } catch {
        return `'${value}' doesn't look like a valid ISO date or null`;
      }
    },
  }
);

export type ServerError = { errorMessage: string };
