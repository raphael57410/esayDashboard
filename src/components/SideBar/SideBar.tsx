import { List, ListItem } from "@tremor/react"
import { useMainUrlStore } from "../../Store/store"

type Props = {
    collectionsName: { name: string, info: { uuid: string } }[]
}
const SideBar = ({ collectionsName }: Props) => {
    const [setCollectionName] = useMainUrlStore(state => [state.setCollectionName])


    return (
        <div className="h-screen bg-slate-800 p-5">
            <h2>EasyDashBoard</h2>
            <List>
                {collectionsName.map(collectionsName => <ListItem onClick={() => setCollectionName(collectionsName.name)} className="hover:cursor-pointer" key={collectionsName.info.uuid}>{collectionsName.name}</ListItem>)}
            </List>
        </div>
    )
}

export default SideBar
