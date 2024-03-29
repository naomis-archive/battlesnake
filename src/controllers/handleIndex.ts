import { Request, Response } from "express";

import { errorHandler } from "../utils/errorHandler";

/**
 * Used for the `/` route, sends back the snake's customisation data.
 *
 * @param {Request} _ Unused request packet.
 * @param {Response} response Response packet.
 */
export const handleIndex = (_: Request, response: Response): void => {
  try {
    const battleSnakeInfo = {
      apiversion: "1",
      author: "nhcarrigan",
      color: "#451c70",
      head: "crystal-power",
      tail: "crystal-power",
    };
    response.status(200).json(battleSnakeInfo);
  } catch (err) {
    errorHandler("index controller", err);
  }
};
