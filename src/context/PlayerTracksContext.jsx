'use client'

import { createContext, useState } from "react"

export const PlayerTracksContext = createContext();

export function PlayerTracksProvider({children}) {
  const [tracks, setTracks] = useState([]);

  return (
    <PlayerTracksContext.Provider value={{tracks, setTracks}}>
      {children}
    </PlayerTracksContext.Provider>
  )
}
