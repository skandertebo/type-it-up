export type GameOptions = {
    difficulty: string;
    time: number;
    numbers: boolean;
    punctuation: boolean;
}


export type Game = {
    text : string;
}

export type GameResults = {
    wpm: number;
    accuracy: number;
    score: number;
}


