import * as Sentry from "@sentry/node";

import { logHandler } from "./logHandler";
import { postToWebhook } from "./postToWebhook";

/**
 * Standard error handling module to pipe errors to Sentry and
 * format the error for logging.
 *
 * @param {string} context A description of where the error occurred.
 * @param {unknown} err The error object.
 */
export const errorHandler = (context: string, err: unknown): void => {
  const error = err as Error;
  logHandler.log("error", `There was an error in the ${context}:`);
  logHandler.log(
    "error",
    JSON.stringify({ errorMessage: error.message, errorStack: error.stack })
  );
  Sentry.captureException(error);
  void postToWebhook(context, error);
};
