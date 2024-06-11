import { useLogin } from '@/context/LoginContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import SingleOrderCard from './SingleOrderCard';

export default function ProfileOrders() {

  const { userId } = useLogin();

  const { data: orders } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        const response = await axios.get(`http://localhost:5059/api/order?userId=${userId}&pageSize=100&page=1`);
        return response.data.data.orders;
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Something Went Wrong";
        throw new Error(errorMessage); // Hatayı burada fırlat
      }
    }
  });

  return (
    <div>
      {orders?.map((order, index) =>
        <SingleOrderCard key={index} order={order} />)  
      }
    </div>
  )
}
