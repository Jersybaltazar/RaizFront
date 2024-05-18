import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApis";
import React,{ useEffect } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const analytcdata = [
  {
    name: "Page A",
    Count: 4000,
  },
  {
    name: "page b",
    Count: 2000,
  },
  {
    name: "page c",
    Count: 7000,
  },
  {
    name: "page d",
    Count: 1000,
  },
  {
    name: "page e",
    Count: 5000,
  },
  {
    name: "page f",
    Count: 4000,
  },
  {
    name: "page g",
    Count: 200,
  },
];
type Props = {
  isDashboard?: boolean;
};
export default function OrdersAnalytics({ isDashboard }: Props) {
  const { data, isLoading } = useGetOrdersAnalyticsQuery({});

  useEffect(()=>{},[]);

  const analyticsData: any = [];
 // data &&
   // data.orders.last12Months.forEach((item: any) => {
     // analyticsData.push({ name: item.name, Count: item.count });
    //});

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh]" : "h-screen"}>
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start`}
            >
              Analitica de las Ordenes
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Datos analíticos de los últimos 12 meses{""}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90%]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analytcdata }
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type="monotone" dataKey="Count" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
