import { CoordinateInt } from "../../interfaces/CoordinateInt";

/**
 * Returns true if the snake's head is at the left of the board.
 *
 * @param {CoordinateInt} location My snake's current head location.
 * @returns {boolean} True if the snake's head is at the left of the board.
 */
export const isAtLeft = (location: CoordinateInt): boolean => {
  return location.x === 0;
};
