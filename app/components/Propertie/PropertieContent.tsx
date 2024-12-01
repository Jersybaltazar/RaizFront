import { useGetPropertyContentQuery } from '@/redux/features/property/propertiesApi';
import React, { useState } from 'react'
import Header from '../Header';
import Heading from '@/app/utils/Heading';
import Loader from '../Loader/Loader';
import PropertyContentMedia from './PropertyContentMedia';

type Props = {
  id:string;
  user:any;
}

const PropertieContent = ({id,user}: Props) => {
  const {data: contentData, isLoading, refetch} = useGetPropertyContentQuery(id,{refetchOnMountOrArgChange:true});
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState('Login')
  const data = contentData?.content;
  const [activeImages, setActiveImages] = useState(0)
  return (
    <>
    {
      isLoading ? (
        <Loader/>
      ):(
        <> 
        <Header activateItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
        <div className='w-full grid 800px:grid-cols-10'>
          <Heading 
          title=''
          description=''
          Keywords=''/>
        <div className='col-span-7'>
          <PropertyContentMedia 
          data={data}
          id={id}
          activeImages={activeImages}
          setActiveImages={setActiveImages}
          user={user}
          refetch={refetch}
          />
        </div>
        </div>
        </>
      )
      
    }
    </>
  )
}

export default PropertieContent