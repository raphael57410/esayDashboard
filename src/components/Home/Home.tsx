import { useMainUrlStore } from '../../Store/store'
import { Button, Title } from '@tremor/react'
import { useQueryGetAllCollectionsName } from '../../service/getAllData';
import GenericTable from '../GenericTable/GenericTable';
import Loader from '../Loader/Loader';
import { Suspense } from 'react';
import LogoutIcon from '@heroicons/react/outline/LogoutIcon';
import { SideBar } from '../SideBar/SideBar';
import { AddRessource } from '../AddRessource/AddRessource';
import { useAddRessourceStore } from '../../Store/addRessourceStore';

const Home = () => {
    const [mainUrl, setMainUrl, collectionName] = useMainUrlStore(state => [state.mainUrl, state.setMainUrl, state.collectionName]);
    const [isOpen, setIsOPen] = useAddRessourceStore(state => [state.isOpen, state.setIsOPen]);
    const { data, isLoading, error } = useQueryGetAllCollectionsName(mainUrl);

    if (!data) return <Loader />
    if (isLoading) return <Loader />
    if (error) return <Button onClick={() => {
        useMainUrlStore.persist.clearStorage()
        setMainUrl("")
    }} >Reset main url</Button>


    return (
        <>
            {!isOpen && <Suspense fallback={'loading...'}>
                <div className='flex w-full'>
                    <SideBar collectionsName={data} />
                    {collectionName &&
                        <div className='w-full bg-slate-900 p-6'>
                            <div className='flex items-center justify-center relative'>
                                <Title className='text-4xl font-bold'>{collectionName}</Title>
                                <div className='absolute right-0'>
                                    <Button icon={LogoutIcon} color='red' onClick={() => {
                                        useMainUrlStore.persist.clearStorage()
                                        setMainUrl("")
                                    }} >Quitter</Button>
                                </div>

                            </div>
                            <GenericTable collectionName={collectionName} />
                        </div>
                    }
                </div>
            </Suspense>}
            {isOpen && <AddRessource />}
        </>
    )
}

export default Home;
