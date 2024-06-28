"use client";
import React, { FC, useState, useEffect } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");

  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if (isSuccess) {
      toast.success("Banner  Actualizado con exito");
      refetch();
    }
    if (error) {
      if (data in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);
  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center 1000px:flex-row 1000px:min-h-screen">
        <div className="relative flex items-center justify-center w-full 1000px:w-1/2 h-72 1000px:h-auto">
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center h-full w-full">
            <div className="relative w-72 h-72 1000px:w-[500px] 1000px:h-[500px] 1500px:w-[700px] 1500px:h-[700px] rounded-full hero_animation">
              <img
                src={image}
                alt="Banner"
                className="object-contain w-full h-full rounded-full"
              />
              <input
                type="file"
                name="banner"
                id="banner"
                accept="image/*"
                onChange={handleUpdate}
                className="hidden"
              />
              <label
                htmlFor="banner"
                className="absolute bottom-4 right-4 z-20"
              >
                <AiOutlineCamera className="dark:text-white text-black text-[18px] cursor-pointer" />
              </label>
            </div>
          </div>
        </div>
        <div className="w-full 1000px:w-1/2 flex flex-col items-center justify-center text-center 1000px:text-left mt-12 1000px:mt-0">
          <textarea
            className="dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full 1000px:text-[60px] 1500px:text-[70px] font-[600]"
            placeholder="Improve Your online learning experience instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={4}
          />
          <br />
          <textarea
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            placeholder="Explora una amplia variedad de terrenos y casas para elegir, ofreciéndote una selección diversa y abundante para encontrar la propiedad perfecta para ti."
            className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent"
          ></textarea>
          <br />
          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? "!cursor-pointer !bg-[#42d383]"
                : "!cursor-not-allowed"
            } !rounded mt-4`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHero;
