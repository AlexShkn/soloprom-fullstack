export const declension = (num: number, forms: [string, string, string]) => {
  const lastDigit = num % 10
  const lastTwoDigits = num % 100
  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return forms[2]
  }
  if (lastDigit === 1) {
    return forms[0]
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return forms[1]
  }
  return forms[2]
}
