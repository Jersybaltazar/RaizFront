"use client"
import React from 'react';
import PropertieDetailsPage from '../../components/Propertie/PropertieDetailsPage';

const Page = ({params}:any)=>{
    return(
        <div>
            <PropertieDetailsPage id={params.id} />
            
        </div>
    )
    
}

export default Page;    