import { getInLocal, setInLocal } from './local-storage'
import localStorageMock from './mocks/local-storage'

Object.defineProperty(window, 'localStorage', {
  value: null,
  writable: true,
})

const testData = { test: 'Test data' }

describe('The local storage helpers', () => {
  let originalLocalStorage

  beforeAll(() => {
    originalLocalStorage = window.localStorage
    ;(window as any).localStorage = localStorageMock
  })

  afterAll(() => {
    ;(window as any).localStorage = originalLocalStorage
  })

  it('should set and get data for the given key in local storage', async () => {
    setInLocal('test.key', testData)
    const storedTest = getInLocal('test.key')
    expect(storedTest).toEqual(testData)
  })

  it('should fallback to an empty array when local storage is not defined', async () => {
    const throwError = () => {
      throw new Error('Derp')
    }
    jest.spyOn(window.localStorage, 'getItem').mockImplementation(throwError)
    jest.spyOn(window.localStorage, 'setItem').mockImplementation(throwError)
    expect(setInLocal('test.key', testData)).toBe(false)
    expect(getInLocal('test.key')).toEqual({})
  })
})
