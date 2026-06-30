import { createContext, useContext, useState } from 'react'

const UIContext = createContext()

export function UIProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [verifyOpen, setVerifyOpen] = useState(false)

  return (
    <UIContext.Provider value={{
      menuOpen, openMenu: () => setMenuOpen(true), closeMenu: () => setMenuOpen(false),
      verifyOpen, openVerify: () => setVerifyOpen(true), closeVerify: () => setVerifyOpen(false),
    }}>
      {children}
    </UIContext.Provider>
  )
}

export function useUI() { return useContext(UIContext) }
