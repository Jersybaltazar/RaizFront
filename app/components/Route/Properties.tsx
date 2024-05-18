import React, { useEffect, useState } from "react";
import { useGetUserAllPropertiesQuery } from "@/redux/features/property/propertiesApi";
import PropertieCard from "../Propertie/PropertieCard";

type Props = {};

const Properties = (props: Props) => {
  const { data, isLoading } = useGetUserAllPropertiesQuery({});
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    setProperties(data?.properties);
  }, [data]);

  return (
    <div>
      <div className={`w-[90%] 800px:w-[80%] m-auto`}>
        <h1 className="text-center font-Poppins text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight">
          Explora en nuestras   <span className="text-gradient">Propiedades</span>
          <br />
          encontraras una gran variedad
        </h1>
        <br />
        <br />
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
          {properties &&
            properties.map((item: any, index: number) => (
              <PropertieCard item={item} key={index} />
              
            ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;
