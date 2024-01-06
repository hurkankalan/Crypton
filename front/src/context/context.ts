import { createContext, useContext } from "react"
export type Global = {
  username: string
  setUsername: (username: string) => void
  token: string
  setToken: (token: string) => void
  role : string
  setRole : (role : string) => void
  balance : number | undefined
  setBalance : (Balance : number) => void
  userId : number
  setUserId : (UserId : number) => void
  bitcoin : number
  setBitcoin : (Bitcoin : number) => void
  currency : string
  setCurrency : (Currency : string) => void
}
export const MyGlobalContext = createContext<Global>({
username: '',
setUsername: () => {},
token: '',
setToken: () => {},
role : '',
setRole : () => {},
balance : 0,
setBalance : () => {},
userId : 0,
setUserId : () => {},
bitcoin : 0,
setBitcoin : () => {},
currency : '',
setCurrency : () => {},
})

export const useGlobalContext = () => useContext(MyGlobalContext)