'use client'
import React from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import Heading from "@/app/utils/Heading";
import CreateProperty from "../../components/Admin/property/CreateProperty";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";

type Props = {};

const page = (props: Props) => {
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
          <CreateProperty />
        </div>
      </div>
    </div>
  );
};

export default page;
