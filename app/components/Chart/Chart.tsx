'use client';
import {
    Chart as ChartJs, 
    Tooltip, 
    CategoryScale, 
    LinearScale, 
    BarElement
    } from "chart.js"
import { FC } from "react";
import {Bar} from 'react-chartjs-2'
import { Booking } from "@/models/booking";

ChartJs.register(Tooltip,CategoryScale,LinearScale,BarElement)

export const option = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Chart.js Bar Chart",
        },
    }
}
const Chart: FC<{userBookings: Booking[]}> = ({userBookings}) => {
    const labels = userBookings.map(booking => booking.hotelRoom.name)
    const amountSpent = userBookings.map(booking => booking.totalPrice);

    return (
        <Bar
          options={option}
          data={{
            labels,
            datasets: [
              {
                label: 'Amount spent',
                data: amountSpent,
                borderWidth: 1,
                backgroundColor: '#F27405',
                hoverBackgroundColor: '#F2C641',
              },
            ],
          }}
        />
      );
    };
    


export default Chart