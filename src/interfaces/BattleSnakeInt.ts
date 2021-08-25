import { CoordinateInt } from "./CoordinateInt";

/**
 * Structure of a BattleSnake object.
 */
export interface BattleSnakeInt {
  id: string;
  name: string;
  health: number;
  body: CoordinateInt[];
  latency: string;
  head: CoordinateInt;
  length: number;
  shout: string;
  squad: string;
}
