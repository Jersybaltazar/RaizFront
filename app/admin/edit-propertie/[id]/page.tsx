'use client'
import React from "react";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import Heading from "@/app/utils/Heading";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import EditProperty from "../../../components/Admin/property/EditProperty"

type Props = {};

const page = ({params}:any) => {
  const id = params?.id;
  return (
    <div>
      <Heading
        title={`creando - Raiz`}
        description="En esta plataforma de bienes y raices encontraras el terreno de tus sueños para que
       vivas tus sueños "
        Keywords="Departamentos, Casas, Terrenos"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditProperty id={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
