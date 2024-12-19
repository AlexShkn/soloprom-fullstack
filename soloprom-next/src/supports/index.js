export function debounce(func, delay) {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

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
