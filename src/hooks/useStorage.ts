import Cookies from 'js-cookie'
import { useCallback, useState, useEffect } from 'react'

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.localStorage)
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)) {
  return useStorage(key, defaultValue, window.sessionStorage)
}

function useStorage<T>(key: string, defaultValue: T | (() => T), storageObject: Storage) {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}

export function useCookie<T>(key: string, defaultValue: T | (() => T)) {
  return useStorageCookie(key, defaultValue, Cookies)
}

function useStorageCookie<T>(key: string, defaultValue: T | (() => T), cookieObject: typeof Cookies) {
  const [value, setValue] = useState(() => {
    const cookieValue = cookieObject.get(key)
    if (cookieValue != null) return JSON.parse(cookieValue)

    if (typeof defaultValue === 'function') {
      return (defaultValue as () => T)()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (value === undefined) return cookieObject.remove(key)
    cookieObject.set(key, JSON.stringify(value))
  }, [key, value, cookieObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
}
