export const local = {
  get: (key, defaultValue = null) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : defaultValue
  },
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key),
  clear: () => localStorage.clear(),
}
