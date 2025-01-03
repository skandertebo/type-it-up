export enum CharState {
    Wrong = 'wrong',
    Deactivated = 'deactivated',
    Right = 'right',
}
  
export type Character = {
    char: string;
    state: CharState;
};

export type Word = Character[];

export type Cursor = {
    wordIndex: number;
    charIndex: number;
};