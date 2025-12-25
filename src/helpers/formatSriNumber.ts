export function formatSriNumber(
  establishment: string,
  emissionPoint: string,
  sequence: number
): string {
  return `${establishment}-${emissionPoint}-${sequence
    .toString()
    .padStart(9, "0")}`;
}
