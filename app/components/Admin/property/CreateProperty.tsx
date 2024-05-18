"use client";
import React, { useEffect, useState } from "react";
import PropertyInformation from "./PropertyInformation";
import PropertyOption from "./PropertyOption";
import PropertyData from "./PropertyData";
import ContentProperty from "./ContentProperty";
import PropertyPreview from "./PropertyPreview";
import { useCreatePropertyMutation } from "@/redux/features/property/propertiesApi";
import { toast } from "react-hot-toast";
import { redirect } from "next/navigation";
type Props = {};

const CreateProperty = (props: Props) => {
  const [createProperty, { isLoading, isSuccess, error }] =
    useCreatePropertyMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Propiedad creada con exito");
      redirect("admin/all-courses");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isLoading, isSuccess, error]);

  const [active, setActive] = useState(0);
  const [propertyInfo, setPropertyInfo] = useState({
    name: "",
    description: "",
    categories: "",
    price: "",
    estimatedPrice: "",
    thumbnail: "",
    tags: "",
    level: "",
    location: "", //cambiar a location
    
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [propertyContentData, setPropertyContentData] = useState([
    { 
      images:"",
      videoUrl: "",//SE TOMA UBI EN EL FORM COMO UBICACION
      bedrooms: "",
      bathrooms: "",
      size: "",
      title: "-",
      description: "",
      videoSection: "Grupo Multimedia",
      videoLength: "",
      virtualTour: "", //remplasa sugerencias 
    },
  ]);
  const [propertyData, setPropertyData] = useState({});

  const handleSubmit = async () => {
    //Formato de array  de beneficios
    const formattedBenefits = benefits.map((benefit) => ({
      title: benefit.title,
    }));
    //Format prerequisites array
    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));
    //Formato de matriz del contenido de propiedad
    const formattedPropertyContentData = propertyContentData.map(
      (propertyContent) => ({
        videoUrl: propertyContent.videoUrl,
        bedrooms: propertyContent.bedrooms,
        bathrooms: propertyContent.bathrooms,
        size: propertyContent.size,
        title: propertyContent.title,
        description: propertyContent.description,
        videoSection: propertyContent.videoSection,
        videoLength: propertyContent.videoLength,
        virtualTour: propertyContent.virtualTour,
        images: propertyContent.images,
      })
    );
    //preparar nuestro objeto de datos
    const data = {
      name: propertyInfo.name,
      description: propertyInfo.description,
      price: propertyInfo.price,
      estimatedPrice: propertyInfo.estimatedPrice,
      tags: propertyInfo.tags,
      level: propertyInfo.level,
      categories: propertyInfo.categories,
      location: propertyInfo.location,
      thumbnail: propertyInfo.thumbnail,
      totalVideos: propertyContentData.length,
      benefits: formattedBenefits,
      prerequisites: formattedPrerequisites,
      propertyContent: formattedPropertyContentData,
    };
    setPropertyData(data);
  };
  console.log(propertyData);

  const handlePropertyCreate = async (e: any) => {
    const data = propertyData;
    if (!isLoading) {
      await createProperty(data); 
    }

  };

  return (
    <div className="w-full flex min-h-screen">
      <div className="w-[80%]">
        {active === 0 && (
          <PropertyInformation
            propertyInfo={propertyInfo}
            setPropertyInfo={setPropertyInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <PropertyData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <ContentProperty
            active={active}
            setActive={setActive}
            propertyContentData={propertyContentData}
            setPropertyContentData={setPropertyContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <PropertyPreview
            active={active}
            setActive={setActive}
            propertyData={propertyData}
            handlePropertyCreate={handlePropertyCreate}
          />
        )}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-0">
        <PropertyOption active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateProperty;
