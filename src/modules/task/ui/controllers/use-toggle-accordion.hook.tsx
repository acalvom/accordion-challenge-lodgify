import { useState } from 'react'

type UseToggleParams = {
  [key: string]: boolean
}

export const useToggleAccordion = (initialState: UseToggleParams = {}) => {
  const [state, setState] = useState<UseToggleParams>(initialState)

  const toggle = (key: string) => {
    setState((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }))
  }

  return [state, toggle] as const
}
