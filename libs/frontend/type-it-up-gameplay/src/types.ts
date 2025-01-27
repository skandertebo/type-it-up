export type GameOptions = {
  difficulty: 'easy' | 'medium' | 'hard';
  time: number;
  numbers: boolean;
  punctuation: boolean;
};

export type Game = {
  text: string;
};

export interface GameResults {
  wpm: number;
  accuracy: number;
  score: number;
}
