import Ratings from "@/app/utils/Ratings";
import React, { useEffect, useState } from "react";
import { useCreateVisitMutation } from "@/redux/features/orders/ordersApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import PropertyContentList from "../Propertie/PropertieContentList";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ModalImage from "react-modal-image";
import Link from "next/link";
import { styles } from "@/app/styles/style";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import socketIO from "socket.io-client";
import ImageWithCarousel from "../carrousel/Carrousel";
import { toast } from "react-hot-toast";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || "";
const socketId = socketIO(ENDPOINT,{transports:["websocket"]});

type Props = {
  data: any;
  setOpen: any;
  setRoute: any;
};

const PropertieDetails = ({
  data,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  //const { user } = useSelector((state: any) => state.auth);
  const [user,setUser] = useState<any>();
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [createVisit] = useCreateVisitMutation(); 

  useEffect(()=>{
    setUser(userData?.user);
  },[userData])

  const discountPorcentaje =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;
  const discountPorcentajePrice = discountPorcentaje.toFixed(0);
  const isPurchased =
    user && user?.properties?.find((item: any) => item._id === data._id);

  const firstImage = data.propertyData[0]?.images[0]?.url;

  const handleOrder = (e: any) => {
    if (user) {
      setOpen(true);
    }else{
      toast.error("Primero debes de Iniciar Sesión")
    }
    
  };
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };
  const handleSave = async () => {
    if (selectedDate && selectedTime) {
      const formattedDate = selectedDate.toISOString();
      const visitData = {
        propertyId: data._id,
        visitDate: formattedDate,
        visitTime: selectedTime,
      };
      try {
        await createVisit(visitData).unwrap();
        socketId.emit("notification",{
          title: "Nueva Agenda",
          message: `Tienes una nueva agenda de ${data.propertie.name}`,
          userId: user._id,
        })
        setOpen(false);
        toast("Visita agendada con éxito");
      } catch (error) {
        toast.error("Error agendando la visita");
      }
      // Aquí puedes agregar la lógica para guardar la fecha y hora agendada
    } else {
      toast.error("Por favor selecciona una fecha y una hora");
    }
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
                <Ratings rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length}Calificaciones
                </h5>
              </div>
            </div>
            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Beneficios de la Propiedad
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
            </div>
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Requisitos para obtener la propiedad
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex 800px:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title} </p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Properties Overview
              </h1>
              <PropertyContentList data={data?.propertieData} />
            </div>
            <br />
            <br />
            {/*Propertie Description*/}
            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Descripcion de la Propiedad
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(1)}{" "}
                  Calificaciones * {data?.reviews?.length}Reviews
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
                          <Ratings rating={data.ratings} />
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
                        <Ratings rating={data.ratings} />
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="w-full 800px:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full">
            {firstImage && (
                <ImageWithCarousel 
                imageSrc={firstImage}                  
                carouselImages={data.propertyData[0]?.images.map((image: any) => image.url)}/>
              )}
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white ">
                  {data.price === 0 ? "Free" : data.price + "$"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white ">
                  {data.estimatedPrice}
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white ">
                  {discountPorcentajePrice}%oferta
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    href={`/propertie-access/${data._id}`}
                  >
                    Verificar Visita
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-pointer !bg-[crimson]`}
                    onClick={handleOrder}
                  >
                    Agendar Visita
                  </div>
                )}
              </div>
              <br />
              <p className="pb-1 text-black dark:text-white">.Asesoria</p>
              <p className="pb-1 text-black dark:text-white">.Asesoria</p>
              <p className="pb-1 text-black dark:text-white">.Asesoria</p>
            </div>
          </div>
        </div>
        <>
          {open && (
            <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center ">
              <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3">
                <div className="w-full flex justify-end">
                  <IoCloseOutline
                    size={40}
                    className="text-black cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-[20px] font-Poppins font-[600] text-black mb-4">
                    Agendar Visita
                  </h2>
                  <div className="mb-4">
                    <label className="block text-black mb-2">Fecha</label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      className="w-full p-2 border text-white border-gray-300 rounded"
                      dateFormat="yyyy/MM/dd"
                      placeholderText="Selecciona una fecha"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-black mb-2">Hora</label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={handleTimeChange}
                      className="w-full p-2 border text-white border-gray-300 rounded"
                    />
                  </div>
                  <button
                    onClick={handleSave}
                    className="w-full p-2 bg-blue-600 text-white rounded"
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default PropertieDetails;
