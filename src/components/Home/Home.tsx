import { useMainUrlStore } from '../../Store/store'
import { Button, Card, Title } from '@tremor/react'
import { useQueryGetAllCollectionsName, useQueryGetAllData } from '../../service/getAllData';
import GenericTable from '../GenericTable/GenericTable';
import SideBar from '../SideBar/SideBar';

const Home = () => {
    const [mainUrl, setMainUrl, collectionName] = useMainUrlStore(state => [state.mainUrl, state.setMainUrl, state.collectionName])
    const { data, refetch } = useQueryGetAllCollectionsName(mainUrl);

    if (!data) return <div>...Loading</div>

    return (
        <div className='flex w-full'>
            <SideBar collectionsName={data} />
            {collectionName && <Card className='w-full bg-slate-900'>
                <Title>{collectionName}</Title>
                <GenericTable collectionName={collectionName} />
                <div className='flex justify-center'>
                    <Button onClick={() => setMainUrl("")} >Reset main url</Button>
                </div>
            </Card>}
        </div>
    )
}

export default Home;
