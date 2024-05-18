import React, { useContext, useEffect, useState } from 'react'
import TotalCartInfo from './TotalCartInfo';
import Link from 'next/link';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { UserContext } from '@/context/UserContext';
import useDebounce from '@/hooks/useDebounce';
import { CartItemSkeleton } from './CartSkeletons';
import toast, { ToastBar } from 'react-hot-toast';
import axios from 'axios';
import { useLogin } from '@/context/LoginContext';


export default function CartItems({ carts }) {

    return (
        <div>
            <TotalCartInfo carts={carts} />
            <div>
                {carts.map((cart) => (
                    <CartItem key={cart.cartID} cart={cart} />
                ))}
            </div>

        </div>
    )
}

function CartItem({ cart }) {

    const { amount, product, status } = cart;
    const [localAmount, setLocalAmount] = useState(cart.amount);

    const { userId } = useLogin();
    const queryClient = useQueryClient();
    const debouncedAmount = useDebounce(localAmount, 500);

    const { mutate: updateCart, isPending } = useMutation({
        mutationFn: async (cart) => {
            const response = await axios.put(`http://localhost:5059/api/cart/${cart.cartID}`, cart);
            console.log(response.data.data)
            return response.data.data;
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something Went Wrong!")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        }
    })

    const { mutate: deleteCart, isPending: isDeletePending } = useMutation({
        mutationFn: async (cartID) => {
            const response = await axios.delete(`http://localhost:5059/api/cart/${cartID}`);
            console.log(response.data.data)
            return response.data.data;
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "Something Went Wrong!")
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['carts'] });
        }
    })


    useEffect(() => {

        const newCart = {
            status,
            userID: userId,
            productID: product.productID,
            amount: debouncedAmount,
            size: cart.size,
            cartID: cart.cartID
        };
        updateCart(newCart);
    }, [debouncedAmount]);

    function onCheckboxChange(e) {
        const newStatus = e.target.checked ? "Checkout" : "Cart";
        const newCart = { status: newStatus, userID: userId, productID: product.productID, amount, size: cart.size, cartID: cart.cartID };
        updateCart(newCart);
    }

    const increaseAmount = () => setLocalAmount(prev => prev + 1);
    const decreaseAmount = () => setLocalAmount(prev => (prev > 0 ? prev - 1 : 0));
    const deleteCartItem = () => deleteCart(cart.cartID);

    return (
        <>
        {!(isPending || isDeletePending) ? (<div className='p-4 md:p-6 my-2 md:my-4 flex flex-col md:flex-row items-center gap-4 bg-white  flex-wrap  border-b'>
            <div className='self-start md:self-center'>
                <input
                    type="checkbox"
                    name="status"
                    className="w-6 h-6"
                    onChange={onCheckboxChange}
                    checked={status === "Checkout" ? true : false}

                />
            </div>
            <div className='w-60 h-60 flex-shrink-0'>
                <img src={product.imagePath} alt={product.productName} className='w-full h-full object-cover rounded' />
            </div>
            <div className='flex-1 break-words '>
                <p className=' md:text-md text-gray-600 mb-1 text-xl'>{product.brand} <span className='text-gray-900'>- {product.productID}</span></p>
                <Link href={`products/details/${product.productID}`}><p className='text-lg md:text-xl text-gray-900 font-sembold mb-3 sm:w-[400px] md:w-full'>{product.productName} </p></Link>

                <p className='text-xl md:text-md text-gray-800 mb-2'> {product.color} | {cart.size} </p>
                <p className='text-xl md:text-xl text-gray-900 font-semibold'>{product.price} TL</p>
            </div>


            <div className='flex items-center gap-2 md:gap-3'>
                <button className='px-2 md:px-3 py-1 md:py-2 border border-gray-300 text-gray-800 hover:bg-gray-100 rounded text-sm md:text-lg' onClick={decreaseAmount}>-</button>
                <span className='px-2 md:px-3 py-1 md:py-2 text-gray-800 text-sm md:text-lg font-semibold'>{localAmount}</span>
                <button className='px-2 md:px-3 py-1 md:py-2 border border-gray-300 text-gray-800 hover:bg-gray-100 rounded text-sm md:text-lg' onClick={increaseAmount}>+</button>
                <button className='ml-4 px-2 md:px-3 py-1 md:py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm md:text-lg' onClick={deleteCartItem}>Delete</button>
            </div>
        </div>) : <CartItemSkeleton />}
        </>)

}
