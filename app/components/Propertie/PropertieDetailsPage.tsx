"use client";
import { useGetPropertieDetailsQuery } from "@/redux/features/property/propertiesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Route/Footer";
import PropertieDetails from "./PropertieDetails";

type Props = {
  id: string;
};

const PropertieDetailsPage = ({ id }: Props) => {
  console.log()
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetPropertieDetailsQuery(id);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data.property.name + "- Raiz"}
            description={
              "Raiz es un sitio donde encontraras propiedades inmobiliarios"
            }
            Keywords={data?.property?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activateItem={1}
          />
          <PropertieDetails
            data={data.property}
          
          />
          <Footer/>
        </div>
      )}
    </>
  );
};

export default PropertieDetailsPage;
