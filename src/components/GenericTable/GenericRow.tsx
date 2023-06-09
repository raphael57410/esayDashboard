import { PencilIcon, TrashIcon, BadgeCheckIcon } from "@heroicons/react/outline";
import { TableRow, TableCell, Badge, TextInput } from "@tremor/react";
import { useMainUrlStore } from "../../Store/store";
import { deleteQuery } from "../Query/delete";
import { useQueryGetAllData } from "../../service/getAllData";
import { useEditRessourceStore } from "../../Store/editRessourceStore";

type ressourceLine = {
    [key: string]: string;
}

type Props = {
    item: ressourceLine
}

const GenericRow = ({ item }: Props) => {
    const [mainUrl, collectionName] = useMainUrlStore(state => [state.mainUrl, state.collectionName])
    const [isEditOpen, setIsEditOPen, itemId, setItemId] = useEditRessourceStore(state => [state.isEditOpen, state.setIsEditOPen, state.itemId, state.setItemId])
    const { refetch } = useQueryGetAllData(collectionName, mainUrl);
    return (
        <TableRow>
            {
                Object.values(item).map((el, i) => !isEditOpen || itemId !== item._id ?
                    <TableCell key={i} className="text-white">{el}</TableCell> :
                    itemId === item._id && <TableCell key={i} className="text-white"><TextInput key={i} value={el} /></TableCell>
                )
            }
            {!isEditOpen && <TableCell className="flex justify-center items-center gap-2">
                <Badge tooltip="Supprimer cette ligne" className="flex hover:cursor-pointer" color="red" icon={TrashIcon} onClick={() => {
                    deleteQuery(`${mainUrl}${collectionName}`, item._id)
                    refetch({ queryKey: collectionName })
                }
                }></Badge>
                <Badge tooltip="Editer cette ligne" className="hover:cursor-pointer" color="yellow" icon={PencilIcon} onClick={() => {
                    console.log(item._id);
                    setItemId(item._id)
                    setIsEditOPen()
                }
                }></Badge>
            </TableCell>}
            {isEditOpen && itemId === item._id && <TableCell>
                <Badge tooltip="Valider" className="flex hover:cursor-pointer" color="green" icon={BadgeCheckIcon} onClick={() => {
                    setIsEditOPen()
                }
                }></Badge>
            </TableCell>}
        </TableRow>
    )
}

export default GenericRow;
