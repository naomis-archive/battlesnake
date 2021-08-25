import { Request, Response } from "express";

import { errorHandler } from "../utils/errorHandler";

/**
 * Used to confirm game start. Sends 200OK.
 *
 * @param {Request} _ Unused Request packet.
 * @param {Response} response Response packet.
 */
export const handleStart = (_: Request, response: Response): void => {
  try {
    response.status(200).send("ok");
  } catch (err) {
    errorHandler("start controller", err);
  }
};
