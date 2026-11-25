"use client";

import { useState } from "react";
import { EMOJI, MOVES, outcome, randomMove, type Move, type Outcome } from "@/lib/game";

type Round = { player: Move; computer: Move; result: Outcome };
type Score = { win: number; lose: number; draw: number };

const MESSAGE: Record<Outcome, string> = {
  win: "You win!",
  lose: "You lose",
  draw: "Draw",
};

const COLOR: Record<Outcome, string> = {
  win: "text-emerald-400",
  lose: "text-rose-400",
  draw: "text-slate-300",
};

export default function Game() {
  const [round, setRound] = useState<Round | null>(null);
  const [score, setScore] = useState<Score>({ win: 0, lose: 0, draw: 0 });

  function play(player: Move) {
    const computer = randomMove();
    const result = outcome(player, computer);
    setRound({ player, computer, result });
    setScore((s) => ({ ...s, [result]: s[result] + 1 }));
  }

  function reset() {
    setRound(null);
    setScore({ win: 0, lose: 0, draw: 0 });
  }

  return (
    <div className="w-full max-w-md space-y-8 text-center">
      <h1 className="text-3xl font-semibold">Rock Paper Scissors</h1>

      <div className="flex justify-center gap-6 text-sm text-slate-300">
        <span>Wins: {score.win}</span>
        <span>Losses: {score.lose}</span>
        <span>Draws: {score.draw}</span>
      </div>

      <div className="flex min-h-36 flex-col items-center justify-center rounded-2xl bg-slate-800 p-6" aria-live="polite">
        {round ? (
          <>
            <div className="flex items-center gap-6 text-6xl">
              <span aria-label={`You: ${round.player}`}>{EMOJI[round.player]}</span>
              <span className="text-2xl text-slate-500">vs</span>
              <span aria-label={`Computer: ${round.computer}`}>{EMOJI[round.computer]}</span>
            </div>
            <p className={`mt-4 text-xl font-medium ${COLOR[round.result]}`}>
              {MESSAGE[round.result]}
            </p>
          </>
        ) : (
          <p className="text-slate-400">Pick a move to start</p>
        )}
      </div>

      <div className="flex justify-center gap-4">
        {MOVES.map((move) => (
          <button
            key={move}
            type="button"
            onClick={() => play(move)}
            className="flex w-24 flex-col items-center gap-1 rounded-xl bg-slate-700 py-4 transition-colors hover:bg-slate-600 active:bg-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <span className="text-4xl">{EMOJI[move]}</span>
            <span className="text-sm capitalize">{move}</span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={reset}
        className="text-sm text-slate-400 underline hover:text-slate-200"
      >
        Reset score
      </button>
    </div>
  );
}
