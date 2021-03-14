import {useEffect, createContext, useState} from 'react'

const STORAGE = 'slides_control'

export function useAuthContext() {
  const [token, setToken] = useState(null)

  const login = (token) => {
    setToken(token)
    localStorage.setItem(STORAGE, token)
  }

  useEffect(() => {
    const token = localStorage.getItem(STORAGE)
    if (!!token)
      setToken(token)
  }, [])

  return {token, login}
}

export const AuthControlContext = createContext({
  token: null, login: () => { }
})
