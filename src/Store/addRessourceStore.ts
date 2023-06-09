import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    isOpen: boolean
}

type Action = {
    setIsOPen: () => void
}


export const useAddRessourceStore = create<State & Action>((set) => ({
    isOpen: false,
    setIsOPen: () => set((state) => ({ isOpen: !state.isOpen })),
}))
