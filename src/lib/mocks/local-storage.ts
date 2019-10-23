export default (() => {
  let store = {}

  return {
    getItem: (key: string) => {
      return store[key] || '{}'
    },
    setItem: (key: string, value: string) => {
      store[key] = value
    },
  }
})()
