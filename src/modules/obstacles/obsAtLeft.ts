import { CoordinateInt } from "../../interfaces/CoordinateInt";

/**
 * Returns true if there is an obstacle directly left of the snake's head.
 *
 * @param {CoordinateInt} location My snake's current head location.
 * @param {CoordinateInt[]} obstacles Array of occupied board squares.
 * @returns {boolean} True if there is an obstacle directly left of the snake's head.
 */
export const obsAtLeft = (
  location: CoordinateInt,
  obstacles: CoordinateInt[]
): boolean => {
  return obstacles.some(
    (coord) => coord.y === location.y && coord.x === location.x - 1
  );
};
