import { GameOptions } from "../types";

export const DefaultGameOptions: GameOptions = {
    difficulty: 'easy',
    time: 30,
    numbers: false,
    punctuation: false
}

export const difficultyMultiplier: { [key: string]: number } = {
    "easy": 1,
    "medium": 1.5,
    "hard": 2
}

export const optionMultiplier = 0.25
