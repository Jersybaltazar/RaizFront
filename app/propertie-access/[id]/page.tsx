'use client'
import Loader from "@/app/components/Loader/Loader"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";
import React,{ useEffect } from "react";
import PropertieContent from "@/app/components/Propertie/PropertieContent";
type Props = {
    params:any;
}
const Page =   ({params}:Props)=>{
    const id = params.id;
    const {isLoading, error, data} =useLoadUserQuery(undefined,{});
    useEffect(()=>{
        if (data) {
            const isVisit = data.user.properties.find((item:any) => item._id === id);
            if(!isVisit){
                redirect("/");
            }
            if (error) {
                redirect("/");
            }
        }
    },[data,error])

    return(
        <>
        {
            isLoading ? (
                <Loader />
            ):(
                <div>
                    <PropertieContent  />
                </div>
            )
        }
        </>
    )
}
export default Page