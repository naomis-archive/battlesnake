import { BattleSnakeInt } from "./BattleSnakeInt";
import { BoardInt } from "./BoardInt";
import { GameInt } from "./GameInt";

/**
 * Structure of a request from the Battlesnake Client.
 */
export interface RequestBodyInt {
  game?: GameInt;
  turn?: number;
  board?: BoardInt;
  you?: BattleSnakeInt;
}
