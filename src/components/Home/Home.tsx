import { useMainUrlStore } from '../../Store/store'
import { Button, Card, Icon, Title, Text } from '@tremor/react'
import { useQueryGetAllCollectionsName } from '../../service/getAllData';
import GenericTable from '../GenericTable/GenericTable';
import Loader from '../Loader/Loader';
import { Suspense, useState } from 'react';
import LogoutIcon from '@heroicons/react/outline/LogoutIcon';
import { SideBar } from '../SideBar/SideBar';
import { AddRessource } from '../AddRessource/AddRessource';
import { useAddRessourceStore } from '../../Store/addRessourceStore';
import { DotsCircleHorizontalIcon, TrashIcon } from '@heroicons/react/outline';

const Home = () => {
    const [mainUrl, setMainUrl, collectionName] = useMainUrlStore(state => [state.mainUrl, state.setMainUrl, state.collectionName]);
    const [isOpen, setIsOPen] = useAddRessourceStore(state => [state.isOpen, state.setIsOPen]);
    const { data, isLoading, error } = useQueryGetAllCollectionsName(mainUrl);
    const [isHoverDot, setIsHoverDot] = useState(false);

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
                                <div className='flex relative'>
                                    <Title className='text-4xl font-bold'>{collectionName}</Title>
                                    <Icon size="md" icon={DotsCircleHorizontalIcon} onClick={() => setIsHoverDot(true)} />
                                    {isHoverDot && <Card className="absolute top-14">
                                        <Button icon={TrashIcon} color='red' variant='light'>Supprimer</Button>
                                        <Button variant='light' onClick={() => setIsHoverDot(false)}>Fermer</Button>
                                    </Card>}
                                </div>
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
