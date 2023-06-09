import { Button, Card, Icon, List, ListItem } from "@tremor/react"
import { useMainUrlStore } from "../../Store/store"
import { useAddRessourceStore } from "../../Store/addRessourceStore"
import { useState } from "react";

type Props = {
    collectionsName: { name: string, info: { uuid: string } }[]
}
export const SideBar = ({ collectionsName }: Props) => {
    const [setCollectionName] = useMainUrlStore(state => [state.setCollectionName])
    const [setIsOPen] = useAddRessourceStore(state => [state.setIsOPen])



    return (
        <div className="h-screen bg-slate-800 p-5">
            <h2>EasyDashBoard</h2>
            <List>
                {collectionsName.map(collectionsName =>
                    <ListItem onClick={() => setCollectionName(collectionsName.name)} className=" hover:cursor-pointer text-2xl hover:text-white" key={collectionsName.info.uuid}>
                        {collectionsName.name}
                    </ListItem>)}
            </List>
            <Button onClick={() => setIsOPen()}>Ajouter une ressource</Button>
        </div>
    )
}


