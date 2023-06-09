import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    mainUrl: string
    collectionName: string
}

type Action = {
    setMainUrl: (url: State['mainUrl']) => void,
    setCollectionName: (name: State['collectionName']) => void,

}


export const useMainUrlStore = create<State & Action, [["zustand/persist", { mainUrl: string; }]]>(
    persist(
        (set, get) => ({
            mainUrl: '',
            collectionName: '',
            setMainUrl: (url) => set(() => ({ mainUrl: url })),
            setCollectionName: (name) => set(() => ({ collectionName: name }))
        }),
        {
            name: "mainUrl",
            version: 1,
            partialize: (state) => ({ mainUrl: state.mainUrl, collectionName: state.collectionName })
        }
    )
)

