import { useMainUrlStore } from '../../Store/store'
import { Button, Card, Title } from '@tremor/react'
import { useQueryGetAllCollectionsName, useQueryGetAllData } from '../../service/getAllData';
import GenericTable from '../GenericTable/GenericTable';
import SideBar from '../SideBar/SideBar';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';

const Home = () => {
    const [mainUrl, setMainUrl, collectionName] = useMainUrlStore(state => [state.mainUrl, state.setMainUrl, state.collectionName])
    const { data, isLoading, error } = useQueryGetAllCollectionsName(mainUrl);

    if (!data) return <Loader />
    if (isLoading) return <Loader />
    if (error) return <Button onClick={() => {
        useMainUrlStore.persist.clearStorage()
        setMainUrl("")
    }} >Reset main url</Button>
    console.log(data);


    return (
        <>
            <Suspense fallback={'loading...'}>
                <div className='flex w-full'>
                    <SideBar collectionsName={data} />
                    {collectionName && <Card className='w-full bg-slate-900'>
                        <Title>{collectionName}</Title>
                        <GenericTable collectionName={collectionName} />
                        <div className='flex justify-center'>
                            <Button onClick={() => {
                                useMainUrlStore.persist.clearStorage()
                                setMainUrl("")
                            }} >Reset main url</Button>
                        </div>
                    </Card>}
                </div>
            </Suspense>
        </>
    )
}

export default Home;
