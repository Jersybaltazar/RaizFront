import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApis";
import React from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  isDashboard?: boolean;
};

const analyticdata = [
  { name: "Enero 2023", count: 400 },
  { name: "Febrero 2023", count: 48200 },
  { name: "Marzo 2023", count: 8200 },
  { name: "Abril 2023", count: 32432 },
  { name: "Mayo 2023", count: 2341 },
  { name: "Junio 2023", count: 2518 },
  { name: "Julio 2023", count: 9821 },
  { name: "Agosto 2023", count: 236 },
  { name: "Setiembre 2023", count: 374 },
  { name: "Octubre 2023", count: 984 },
  { name: "Noviembre 2023", count: 768 },
  { name: "Diciembre 2023", count: 926 },
];

const UsersAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetUsersAnalyticsQuery({});

  const analyticsData: any = [];

  data &&
    data.users.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.month, count: item.count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={`${
            !isDashboard
              ? "mt-[50px]"
              : "mt-[50px] dark:bg-[#111c43] shadow-sm pb-5 rounded-sm "
          }`}
        >
          <div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Analítica de usuarios
            </h1>
            {!isDashboard && (
              <p className={`${styles.title} px-5`}>
                Datos analíticos de los últimos 12 meses{""}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              isDashboard ? "h-[30vh]" : "h-screen"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={!isDashboard ? "50%" : "100%"}
            >
              <AreaChart
                data={analyticdata}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#4d62d9"
                  fill="#4d62d9"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersAnalytics;
