export const throttle = (func, delay) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      func.apply(null, args)
    }, delay)
  }
}

export const getDigFormat = (item) => {
  if (!item) return
  return item.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ')
}

export const getCurrentWindowSize = () => {
  if (typeof window !== 'undefined') {
    return document.body.getBoundingClientRect().width
  } else {
    return 0
  }
}
