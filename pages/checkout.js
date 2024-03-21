import CheckoutForm from '@/components/checkout/CheckoutForm'
import CheckoutInfo from '@/components/checkout/CheckoutInfo'
import CheckoutProducts from '@/components/checkout/CheckoutProducts'
import { UserContext } from '@/context/UserContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'

export default function checkout() {

  const {userId} = useContext(UserContext);


  const { data: carts, isError, error, isFetching, isLoading } = useQuery({
    queryKey: ['carts', userId],
    queryFn: async () => {

        try {
            const response = await axios.get(`http://localhost:5059/api/cart?userId=${userId}&pageSize=100&pageNumber=1&status=Checkout`);
            console.log(response.data.data.data)
            return response.data.data.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Something Went Wrong";
            throw new Error(errorMessage); // Hatayı burada fırlat
        }
    }
});

  return (
    <div>
      <div className='mt-8'>
        <h1 className='text-4xl'>Complete Shopping</h1>  
      </div>    
      <div className='mt-4 lg:flex lg:justify-center lg:align-center lg:gap-4'>
        <div className='w-full lg:w-1/2 bg-red-500'>
          <CheckoutForm></CheckoutForm>
        </div>
      
        <div className='w-full lg:w-1/2 '>
          <div className='mb-4'><CheckoutInfo carts={carts}></CheckoutInfo></div>
          
          <CheckoutProducts carts={carts}></CheckoutProducts>
        </div>
        
      </div>
    </div>
  )
}
