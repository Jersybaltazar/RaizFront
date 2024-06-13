'use client'
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from './SideBarProfile'
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import UpdatePassword from "./UpdatePassword";
import { useGetUsersAllPropertiesQuery } from "@/redux/features/property/propertiesApi";
import PropertieCard from "../Propertie/PropertieCard";

type Props = {
    user:any;
};

const Profile: FC<Props> = ({user}) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [properties, setProperties] = useState([]);
  const {data, isLoading} = useGetUsersAllPropertiesQuery(undefined,{});
  const {} = useLogOutQuery(undefined,{
    skip: !logout ? true: false,
  });
  const [active, setActive] = useState(1);

  const logOutHandler = async ()=>{
    setLogout(true);
    await signOut();

  }
   if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  };
  useEffect(()=>{
    if (data) {
      const filterProperties = user.properties
      .map((userPopertie:any)=> data.properties.find((propertie:any)=>propertie._id === userPopertie._id ) )
      .filter((propertie:any)=> propertie !== undefined);
      setProperties(filterProperties)
    }
  },[data])
  
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 border bg-white dark:border-[#ffffff1d] border-[#0000001c] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        }left-[30px]`}
      >
        <SideBarProfile
        user={user}
        active={active}
        avatar={avatar}
        setActive={setActive}
        logOutHandler={logOutHandler}
        
        />
      </div>
      {active === 1 && ( 
        <div className="w-full h-full bg-transparent mt-[80px]">
        <ProfileInfo avatar={avatar} user={user}/>
        </div>
      )}
       {active === 2 && ( 
        <div className="w-full h-full bg-transparent mt-[80px]">
        <UpdatePassword />
        </div>
      )}
      {
        active === 3 && (
          <div className="w-full pl-7 px-2 800px:px-10 800px:pl-8">
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] ">
              {
                properties && 
                properties.map((item:any, index:number)=>( 
                  <PropertieCard item={item} key={index} isProfile={true} />
                ))}
            </div>
                {
                  properties.length === 0 && (
                    <h1 className="text-center text-[18px] font-Poppins">
                        No tienes ninguna propiedad visitada!
                    </h1>
                  )
                }
          </div>
        )
      }
    </div>
  );
};
export default Profile;
