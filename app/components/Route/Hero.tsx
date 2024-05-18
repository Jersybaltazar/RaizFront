import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { AnimatedTooltipPreview } from "./AnimatedPerfil";
import ChatBox from "../ChatBot/ChatBot";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [search, setSearch] = useState("");
  const router = useRouter();
  const handleSearch = () => {
    if (search === "") {
      return;
    } else {
      router.push(`/properties?title=${search}`);
    }
  };

  const originalText = data?.layout?.banner?.title;
  const [editableTitle, setEditableTitle] = useState<string>("");
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    if (data?.layout?.banner?.title) {
      setEditableTitle(data.layout.banner.title);
    }
  }, [data]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= originalText.length) {
        setDisplayText(originalText.slice(0, index));
        index++;
      } else {
        index = 0;
      }
    }, 150);
    return () => clearInterval(interval);
  }, [originalText]);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full 1000px:flex items-center">
          <div className="absolute top-[100px] 1000px:top-[unset] 1500px:h-[700px] 1500px:w-[700px] 1100px:h-[600px] 1100px:w-[600px] h-[50vh] w-[50vh] hero_animation" />
          <div className="1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[70px] 1000px:pt-[0] z-10">
            <Image
              src={data?.layout?.banner?.image?.url}
              width={500}
              height={400}
              alt=""
              className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-[auto] z-[1o]"
            />
          </div>
          <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
            <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[70px] font-[600] font-Josefin py-2 1000px:leading-[75px] 1500px:w-[50px]">
              {displayText}
            </h2>
            <br />
            <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin italic font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
              {data?.layout?.banner?.subTitle}
            </p>
            <br />
            <br />
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px] bg-transparent relative">
              <input
                type="search"
                placeholder="Buscar propiedades"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none tex-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-Josefin"
              />
              <div
                className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[15px]"
                onClick={handleSearch}
              >
                <BiSearch className="text-white" size={30} />
              </div>
            </div>
            <br />
            <br />
            <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] relative flex items-center">
              <AnimatedTooltipPreview />
              <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
                500k + personas registradas . {""}
                <Link
                  href="/properties"
                  className="dark:text-[#46e256] text-[crimson]"
                >
                  Ver Propiedades
                </Link>
                {""}
              </p>
            </div>
            <br />
          </div>
          <div className="absolute bottom-0 right-0 mr-4 mb-4">
            <ChatBox />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
