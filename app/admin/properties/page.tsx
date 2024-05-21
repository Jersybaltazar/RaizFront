"use client";
import React, { useState, FC } from "react";
import AdminProtected from "../../hooks/adminProtected";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import Heading from "../../utils/Heading";
import DashboardHero from "../../components/Admin/DashboardHero";
import { useSelector } from "react-redux";
import AllProperties from "@/app/components/Admin/property/AllProperties";

interface Props {}

const Page: FC<Props> = (props) => {

  return (
    <div>
      <AdminProtected>
        <Heading
          title={`raiz - properties`}
          description="En esta plataforma de bienes y raices encontraras el terreno de tus sueños para que
       vivas tus sueños "
          Keywords="Departamentos, Casas, Terrenos"
        />
        <div className="flex h-[200vh]">
          <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
          </div>
          <div className="w-[85%]">
            <DashboardHero isDashboard={false} />
            <AllProperties />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};
export default Page;
