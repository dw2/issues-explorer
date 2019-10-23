export const getInLocal = (key: string): object => {
  try {
    const data = localStorage.getItem(key)
    return JSON.parse(data) || {}
  } catch (err) {
    return {}
  }
}

export const setInLocal = (key: string, data: object): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (err) {
    return false
  }
}
