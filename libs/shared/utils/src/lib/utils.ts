export function utils(): string {
  return 'utils';
}

export function generateRandomString(length: number): string {
  return Math.random().toString(36).substring(2, length + 2);
}