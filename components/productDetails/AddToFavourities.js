import { useLogin } from '@/context/LoginContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import Button from '../UI/elements/Button';
import toast from 'react-hot-toast';

export default function AddToFavourities({ product }) {

    const { productID } = product;
    const { userId, token, expireTime } = useLogin();
    const queryClient = useQueryClient();

    const { mutate: addToFavouritiesMutationFunc, isPending, error: submitError } = useMutation({
        mutationFn: async (body) => {
            const url = "http://localhost:5059/api/favourities";
            const method = "POST";
            const response = await axios({
                url: url,
                method,
                data: body,
            });
            return response.data;
        },
        onSuccess: () => {
            toast.success("Product added to favourities");
            queryClient.invalidateQueries({ queryKey: ["favourities"] });
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.response.data.message || "Product can not added to favourities")
        }
    });

    const isExpired = () => {
        if (!token || !expireTime) {
            console.log("token veya expireTime yok");
            return true;
        }

        const now = new Date();
        console.log("now", now);

        const isExpired = new Date() > new Date(expireTime);
        console.log("isExpired", isExpired);

        return isExpired;
    };

    const addToFavouritiesHandler = () => {
        /* test amaçlı kapalı
        if (isExpired()) {
            router.replace('/login', { state: { from: router.asPath } });
            return toast.error("You need to login to add favourities")
        }*/

        const body = {
            productID,
            userID: userId
        }

        addToFavouritiesMutationFunc(body);

    }


    return (
        <Button variant="outlined" onClick={addToFavouritiesHandler} disabled={isPending}  styles="w-1/2">Add To Favourities</Button>
    )
}
