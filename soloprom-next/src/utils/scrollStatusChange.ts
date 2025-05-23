export const scrollStatusChange = (action: boolean) => {
  document.body.style.overflow = action ? 'hidden' : ''
  document.body.style.paddingRight = action ? '17px' : ''
}
export const sideOffsetStatusChange = (action: boolean) => {
  document.body.style.paddingRight = action ? '17px' : ''
}

export const scrollHiddenStatusChange = (action: boolean) => {
  document.body.style.overflow = action ? 'hidden' : ''
}
