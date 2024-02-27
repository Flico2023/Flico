import ErrorAlert from '@/components/UI/elements/ErrorAlert';
import { UserContext } from '@/context/UserContext'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import React, { useCallback, useContext } from 'react'
import toast, { ToastBar } from 'react-hot-toast';
import CartSkeletons from './CartSkeletons';
import CartEmpty from './CartEmpty';
import CartItems from './CartItems';
import CheckoutTotal from './CheckoutTotal';

export default function CartContainer() {
    const {userId} = useContext(UserContext);
    const queryClient = useQueryClient();

    const { data: carts, isError, error, isFetching, isLoading } = useQuery({
      queryKey: ['carts', userId],
      queryFn: async () => {

          try {
              const response = await axios.get(`http://localhost:5059/api/cart?userId=${userId}&pageSize=100&pageNumber=1`);
              return response.data.data.data;
          } catch (error) {
              const errorMessage = error.response?.data?.message || "Something Went Wrong";
              throw new Error(errorMessage); // Hatayı burada fırlat
          }
      }
  });



  console.log("carts")
  console.log(carts)

  return (
    <div className='mt-12'>
       <h1 className='text-4xl mb-12'>Cart </h1>
       
      
          {isLoading && <CartSkeletons/>}
          {isError && <ErrorAlert message={error?.message} />} 
          {carts && carts.length === 0 && (<CartEmpty/>)}
          {carts && carts.length !== 0 && (
            <div className='flex lg:justify-between lg:items-start lg:flex-row gap-4 flex-col items-center justify-center'>
               <div className='w-full lg:w-3/4 order-2 lg:order1'>
                <CartItems carts={carts} />
              </div> 
               <div className='w-full lg:w-1/4 order-1 lg:order-2'>
                <CheckoutTotal carts={carts}/>
              </div> 
            </div>
          )}
   


    
    </div>
  )

}
