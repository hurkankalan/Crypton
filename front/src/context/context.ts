import { createContext, useContext } from "react"
export type Global = {
  username: string
  setUsername: (username: string) => void
}
export const MyGlobalContext = createContext<Global>({
username: '', // set a default value
setUsername: () => {},

})

export const useGlobalContext = () => useContext(MyGlobalContext)