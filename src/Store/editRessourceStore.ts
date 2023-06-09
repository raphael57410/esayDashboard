import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    isEditOpen: boolean
    itemId: string

}

type Action = {
    setIsEditOPen: () => void
    setItemId: (id: State['itemId']) => void
}


export const useEditRessourceStore = create<State & Action>((set) => ({
    isEditOpen: false,
    itemId: '',

    setIsEditOPen: () => set((state) => ({ isEditOpen: !state.isEditOpen })),
    setItemId: (id) => set(() => ({ itemId: id })),

}))
