

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import React, { useCallback, useContext } from 'react'
import toast, { ToastBar } from 'react-hot-toast';

import { useLogin } from '@/context/LoginContext';
import ErrorAlert from '@/components/UI/elements/ErrorAlert';
import ProductsSkeleton from '@/components/allProducts/ProductsSkeleton';
import FavouritiesEmpty from '@/components/favourities/FavouritiesEmpty';
import FavouritiesCard from '@/components/favourities/FavouritiesCard';

export default function Favourities() {
    const { userId } = useLogin();
    const queryClient = useQueryClient();

    const { data: favourities, isError, error, isLoading } = useQuery({
        queryKey: ['favourities', userId],
        queryFn: async () => {

            try {
                const response = await axios.get(`http://localhost:5059/api/favourities/${userId}`);
                return response.data;
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Something Went Wrong";
                throw new Error(errorMessage); // Hatayı burada fırlat
            }
        }
    });

    console.log(favourities)


    return (
        <div className='mt-12'>
            <h1 className='text-4xl mb-12'>Favourities </h1>

            {isLoading && <ProductsSkeleton></ProductsSkeleton>}
            {isError && <ErrorAlert message={error?.message} />}
            {favourities && favourities.length === 0 && (<FavouritiesEmpty />)}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {favourities &&
                    favourities.length !== 0 &&
                    favourities.map((fav) => (
                        <FavouritiesCard
                            fav={fav.product}
                            key={fav.favouriteId}
                            id={fav.favouriteId}
                        ></FavouritiesCard>
                    ))}
            </div>


        </div>
    )

}
