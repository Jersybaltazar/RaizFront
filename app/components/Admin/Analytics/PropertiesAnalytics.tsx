import { styles } from '@/app/styles/style';
import { useGetPropertiesAnalyticsQuery } from '@/redux/features/analytics/analyticsApis'
import React from 'react'
import { Bar, BarChart, Label, LabelList, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import Loader from '../../Loader/Loader';

type Props = {}

const PropertiesAnalytics = (props: Props) => {
    const {data, isLoading} = useGetPropertiesAnalyticsQuery({});

    const analyticsData = [
        {name:'Jun 2023',uv:3},
        {name:'July 2023',uv:2},
        {name:'August 2023',uv:5},
        {name:'Sept 2023',uv:7},
        {name:'Octob 2023',uv:3},
        {name:'Nov 2023',uv:3},
        {name:'Dec 2023',uv:30},
    ];

    const analyticsdata:any = [];
    data &&
    data.properties.last12Months.forEach((item:any)=>{
        analyticsdata.push({name:item.month, uv:item.count});
    });
    const minValue = 0;
  return (
    <>
    {
        isLoading ?(
            <Loader/>
        ):(
            <div className='h-screen'>
                <div className='mt-[50px] '>
                    <h1 className={`${styles.label} px-5 !text-start`}>
                        Properties Analytics
                    </h1>
                    <p className={`${styles.label} px-5`}>
                    Datos analíticos de los últimos 12 meses {""}
                    </p>
                </div>
                <div className='w-full h-[90%] flex items-center justify-center '>
                    <ResponsiveContainer width="90%" height="50%">
                        <BarChart
                        width={150} height={300} data={analyticsData}>
                            <XAxis dataKey="name">
                                <Label offset={0} position="insideBottom"/>
                            </XAxis>
                            <YAxis
                            domain={[minValue,"auto"]}/>
                            <Bar dataKey="uv" fill='#3faf82'>
                                <LabelList dataKey="uv" position="top"/>
                            </Bar>
                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </div>
        )
    }
    </>
  )
}

export default PropertiesAnalytics