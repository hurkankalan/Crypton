import { createContext, useContext } from "react"
export type Global = {
  username: string
  setUsername: (username: string) => void
  token: string
  setToken: (token: string) => void
  role : string
  setRole : (role : string) => void
}
export const MyGlobalContext = createContext<Global>({
username: '',
setUsername: () => {},
token: '',
setToken: () => {},
role : '',
setRole : () => {}
})

export const useGlobalContext = () => useContext(MyGlobalContext)