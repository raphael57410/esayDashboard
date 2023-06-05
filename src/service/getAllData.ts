import { useQuery } from "react-query"

export const useQueryGetAllData = (collectionName: string, mainUrl: string) => {


    return useQuery<any, Error>({
        queryKey: [collectionName],
        queryFn: async () => fetch(mainUrl + collectionName).then((res) => res.json()),
        cacheTime: Infinity,
        suspense: true,
    })
}

export const useQueryGetAllCollectionsName = (collectionName: string) => {


    return useQuery<any, Error>({
        queryKey: ['all_collection'],
        queryFn: async () => fetch(collectionName).then((res) => res.json()),
        cacheTime: Infinity,
        suspense: true,
    })
}