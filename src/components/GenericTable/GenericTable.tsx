import { StatusOnlineIcon } from "@heroicons/react/outline";
import { Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Text } from "@tremor/react";
import GenericRow from "./GenericRow";
import { useQueryGetAllData } from "../../service/getAllData";
import { useMainUrlStore } from "../../Store/store";
import { Suspense, useEffect } from "react";

type Props = {
    collectionName: string
}

const GenericTable = ({ collectionName }: Props) => {
    const [mainUrl] = useMainUrlStore(state => [state.mainUrl])


    const { data } = useQueryGetAllData(collectionName, mainUrl);

    if (!data) return <div>...Loading</div>

    return (
        <Table className="mt-5">
            <TableHead>
                <TableRow>

                    {
                        data[collectionName][0] && Object.keys(data[collectionName][0]).map(key => <TableCell key={key}>{key}</TableCell>)
                    }

                </TableRow>
            </TableHead>
            <TableBody>
                {data && data[collectionName].map((item: any) => (
                    <GenericRow key={item._id} item={item} />
                ))}

            </TableBody>
        </Table>
    )
}

export default GenericTable;
