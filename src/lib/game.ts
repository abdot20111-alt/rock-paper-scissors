export type Move = "rock" | "paper" | "scissors";
export type Outcome = "win" | "lose" | "draw";

export const MOVES: Move[] = ["rock", "paper", "scissors"];

export const EMOJI: Record<Move, string> = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️",
};

// Each move beats exactly one other move.
const BEATS: Record<Move, Move> = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

export function outcome(player: Move, computer: Move): Outcome {
  if (player === computer) return "draw";
  return BEATS[player] === computer ? "win" : "lose";
}

export function randomMove(rand: () => number = Math.random): Move {
  return MOVES[Math.floor(rand() * MOVES.length)];
}
