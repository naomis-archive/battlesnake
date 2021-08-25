import { BattleSnakeInt } from "./BattleSnakeInt";
import { CoordinateInt } from "./CoordinateInt";

/**
 * Structure of a game board.
 */
export interface BoardInt {
  height: number;
  width: number;
  food: CoordinateInt[];
  hazards: CoordinateInt[];
  snakes: BattleSnakeInt[];
}
