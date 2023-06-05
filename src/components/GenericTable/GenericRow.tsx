import { TrashIcon } from "@heroicons/react/outline";
import { TableRow, TableCell, Badge } from "@tremor/react";
import { useMainUrlStore } from "../../Store/store";
import { deleteQuery } from "../Query/delete";
import { useQueryGetAllData } from "../../service/getAllData";

type ressourceLine = {
    [key: string]: string;
}

type Props = {
    item: ressourceLine
}

const GenericRow = ({ item }: Props) => {
    const [mainUrl, collectionName] = useMainUrlStore(state => [state.mainUrl, state.collectionName])
    const { refetch } = useQueryGetAllData(collectionName, mainUrl);
    return (
        <TableRow key={item._id}>
            {
                Object.values(item).map((el) => <TableCell className="text-white">{el}</TableCell>)
            }
            <TableCell className="flex justify-center items-center">
                <Badge className="hover:cursor-pointer" color="red" icon={TrashIcon} onClick={() => {
                    deleteQuery(`${mainUrl}${collectionName}`, item._id)
                    refetch({ queryKey: collectionName })
                }
                }></Badge>
            </TableCell>
        </TableRow>
    )
}

export default GenericRow;
