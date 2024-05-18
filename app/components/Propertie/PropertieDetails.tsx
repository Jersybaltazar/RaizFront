import React from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

type Props = {
  data: any;
};

const PropertieDetails = ({ data }: Props) => {
  const { user } = useSelector((state: any) => state.auth);
  const discountPorcentaje =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPorcentajePrice = discountPorcentaje.toFixed(0);
  const isPurchased =
    user && user?.properties?.find((item: any) => item._id === data._id);
  const handleOrder = (e: any) => {
    console.log("g");
  };
  return (
    <div>
      <div className="w-[90%] 800px:w-[90%] m-auto py-5">
        <div className="w-full flex flex-col-reverse 800px:flex-row">
          <div className="w-full 800px:w-[65%] 800px:pr-5 ">
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>
            <div className="flex items-center justify-between pt-3">
              <div className="flex items-center">
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length}Calificaciones
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased}Comprado
              </h5>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div
                  className="w-full flex 800px:items-center py-2"
                  key={index}
                >
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}{" "}
                  </p>
                </div>
              ))}
              <br />
              <br />
              <div>
                <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  Properties Overview
                </h1>
                {/* Lista Contenido dela Propiedad */}
              </div>
              <br />
              <br />
              {/*Propertie Description*/}
              <div className="w-full">
                <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                  Properties Details
                </h1>
                <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                  {data.description}
                </p>
              </div>
              <br />
              <br />
              <div className="w-full">
                <div className="800px:flex items-center">
                  <div className="mb-2 800px:mb-[unset]" />
                  <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(1)}{" "}
                    Propertie Rating * {data?.reviews?.length}Reviews
                  </h5>
                </div>
                <br />
                {(data?.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div className="w-full pb-4" key={index}>
                      <div className="flex">
                        <div className="w-[50px] h-[50px]">
                          <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                            <h1 className="uppercase text-[18px] text-black dark:text-white ">
                              {item.user.name?.slice(0, 2)}
                            </h1>
                          </div>
                        </div>
                        <div className="hidden 800px:block pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[18px] pr-2 text-black dark:text-white ">
                              {item.user.name}
                            </h5>
                          </div>
                          <p className="text-black dark:text-white">
                            {item.comment}
                          </p>
                          <small className="text-[#000000d1] dark:text-[#ffffff83] ">
                            {format(item.createdAt)}
                          </small>
                        </div>
                        <div className="pl-2 flex 800px:hidden items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white ">
                            {item.user.name}{" "}
                          </h5>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertieDetails;
