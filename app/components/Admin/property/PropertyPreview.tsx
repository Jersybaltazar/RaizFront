import { styles } from "@/app/styles/style";
import Ratings from "@/app/utils/Ratings";
import React, { FC } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

type Props = {
  active: number;
  setActive: (active: number) => void;
  propertyData: any;
  handlePropertyCreate: any;
};

const PropertyPreview: FC<Props> = ({
  propertyData,
  handlePropertyCreate,
  setActive,
  active,
}) => {
  console.log(propertyData)
  const discountPercentenge =
    ((propertyData?.estimatedPrice - propertyData?.price) /
      propertyData?.estimatedPrice) *
    100;
  const discountPercentengePrice = discountPercentenge.toFixed(0);
const prevButton = ()=>{
    setActive(active-1);
};
const createProperty = () =>{
    handlePropertyCreate();
}



  return (
    <div className="w-[90%] m-auto py-5 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10"></div>
        <div className="flex items-center">
          <h1 className="pt-5 text-[25px]">
            {propertyData?.price === 0 ? "Free" : propertyData?.price + "$"}
          </h1>
          <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
            {propertyData?.estimatedPrice}$
          </h5>
          <h4 className="pl-5 pt-4 text-[22px]">
            {discountPercentengePrice}%OFF
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${styles.button} !w-[180px] my-3 font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Visitar{propertyData?.price}
          </div>
        </div>

        <div className="w-full">
          <div className="w-full 800px:pr-5">
            <h1 className="text-[25px] font-Poppins font-[600]">
              {propertyData?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <Ratings rating={0} />
                <h5> 0 reviews</h5>
              </div>
              <h5> 0 Clientes</h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600]">
              Beneficios al Obtener la propiedads
            </h1>
            <div>
              {propertyData?.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline size={20} />
                  </div>
                  <p className="pl-2">{item.title}</p>
                </div>
              ))}
              <br />
              <br />
              {/*Desripcion del curso*/}
              <div className="w-full">
                <h1 className="text-[25px] font-Poppins font-[600]">
                  Detalles de la propiedad
                </h1>
                {propertyData?.description}
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
        onClick={() => prevButton()}>
            Prev
        </div>
        <div className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
        onClick={()=>createProperty()}>
            Crear
        </div>

      </div>
    </div>
  );
};

export default PropertyPreview;
