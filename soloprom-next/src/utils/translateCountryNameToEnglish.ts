export function translateCountryNameToEnglish(
  countryName: string,
): string | undefined {
  switch (countryName) {
    case 'Россия':
      return 'russia'
    case 'Индия':
      return 'india'
    case 'Китай':
      return 'china'
    case 'Япония':
      return 'japan'
    case 'Германия':
      return 'germany'
    default:
      return undefined
  }
}
