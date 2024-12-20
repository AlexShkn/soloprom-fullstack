type AdaptiveGroup<T> = {
  [key: string]: { [key: string]: string }
}

export type AdaptiveValues<T extends AdaptiveGroup<any>> = T

export const getAdaptiveValue = <T extends AdaptiveGroup<any>>(
  obj: AdaptiveValues<T>,
  group: keyof T,
  category: string,
): string => {
  const groupData = obj[group]
  if (groupData && groupData.hasOwnProperty(category)) {
    return groupData[category]
  } else {
    return ''
  }
}
